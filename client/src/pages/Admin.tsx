import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Camera,
  CheckCircle2,
  Database,
  FileUp,
  GraduationCap,
  ImagePlus,
  KeyRound,
  LayoutDashboard,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import type { NoticeDocument } from "@/components/NoticeViewerModal";
import {
  defaultSiteContent,
  GalleryItem,
  mergeContent,
  SchoolStaffCategory,
  SecondaryDepartment,
  SiteContent,
} from "@/lib/siteContent";

type AdminTab = "gallery" | "notices" | "schoolStaff" | "secondaryStaff";
type StaffMode = "schoolStaff" | "secondaryStaff";

const tabs: Array<{ id: AdminTab; label: string; hint: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: "gallery", label: "Gallery", hint: "Photos", icon: Camera },
  { id: "notices", label: "Notices", hint: "Announcements", icon: Bell },
  { id: "schoolStaff", label: "School Staffs", hint: "Faculty page", icon: Users },
  { id: "secondaryStaff", label: "Secondary Staffs", hint: "+2 faculty", icon: GraduationCap },
];

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10";
const labelClass = "text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500";
const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-60";

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    let message = "";
    try {
      const data = text ? JSON.parse(text) : {};
      message = data.message || "";
    } catch {
      message = text;
    }
    throw new Error(message || `Request failed (${response.status})`);
  }
  return response.json();
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
}

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function arrayToLines(value?: string[]) {
  return (value || []).join("\n");
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

function EmptyEditor({ icon: Icon, title, copy }: { icon: React.ComponentType<{ className?: string }>; title: string; copy: string }) {
  return (
    <div className="grid min-h-[360px] place-items-center rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <div>
        <Icon className="mx-auto h-11 w-11 text-slate-300" />
        <h3 className="mt-4 text-lg font-black text-slate-800">{title}</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">{copy}</p>
      </div>
    </div>
  );
}

function newNotice(): NoticeDocument {
  const today = new Date().toISOString().slice(0, 10);
  return {
    id: Date.now(),
    title: "New notice",
    category: "notice",
    date: today,
    refNo: `RSS/${new Date().getFullYear()}/${Math.floor(Math.random() * 900 + 100)}`,
    publishedDate: today,
    content: {
      salutation: "Dear students, guardians, and staff,",
      introduction: "Write the notice details here.",
      body: "Write the notice details here.",
      bulletPoints: [],
      instructionsTitle: "",
      instructions: [],
      closing: "",
      signatoryName: "Surya Bahadur Chand",
      signatoryTitle: "Principal, RSS",
    },
  };
}

export default function Admin() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [activeTab, setActiveTab] = useState<AdminTab>("gallery");
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);
  const [selectedSchoolCategoryId, setSelectedSchoolCategoryId] = useState<string | null>(null);
  const [selectedSchoolMemberId, setSelectedSchoolMemberId] = useState<string | null>(null);
  const [selectedSecondaryDepartmentId, setSelectedSecondaryDepartmentId] = useState<string | null>(null);
  const [selectedSecondaryMemberId, setSelectedSecondaryMemberId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let alive = true;
    Promise.all([
      fetch("/api/admin/session", { credentials: "include" }),
      fetch("/api/content", { credentials: "include", cache: "no-store" }),
    ])
      .then(async ([session, contentResponse]) => {
        if (!alive) return;
        const sessionData = session.ok ? await session.json().catch(() => ({ ok: false })) : { ok: false };
        setIsAuthed(Boolean(sessionData.ok));
        if (contentResponse.ok) setContent(mergeContent(await contentResponse.json()));
      })
      .finally(() => {
        if (alive) setIsLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!isAuthed) return;
    if (!selectedGalleryId && content.gallery[0]) setSelectedGalleryId(content.gallery[0].id);
    if (!selectedNoticeId && content.notices[0]) setSelectedNoticeId(content.notices[0].id);

    const firstSchoolCategory = content.faculty.schoolStaffCategories[0];
    if (!selectedSchoolCategoryId && firstSchoolCategory) {
      setSelectedSchoolCategoryId(firstSchoolCategory.id);
      setSelectedSchoolMemberId(firstSchoolCategory.members[0]?.id || null);
    }

    const firstSecondaryDepartment = content.faculty.secondaryDepartments[0];
    if (!selectedSecondaryDepartmentId && firstSecondaryDepartment) {
      setSelectedSecondaryDepartmentId(firstSecondaryDepartment.id);
      setSelectedSecondaryMemberId(firstSecondaryDepartment.members[0]?.id || null);
    }
  }, [
    content,
    isAuthed,
    selectedGalleryId,
    selectedNoticeId,
    selectedSchoolCategoryId,
    selectedSecondaryDepartmentId,
  ]);

  const selectedGallery = useMemo(
    () => content.gallery.find((item) => item.id === selectedGalleryId) || null,
    [content.gallery, selectedGalleryId],
  );
  const selectedNotice = useMemo(
    () => content.notices.find((notice) => notice.id === selectedNoticeId) || null,
    [content.notices, selectedNoticeId],
  );

  const selectedSchoolCategory =
    content.faculty.schoolStaffCategories.find((category) => category.id === selectedSchoolCategoryId) || null;
  const selectedSchoolMember =
    selectedSchoolCategory?.members.find((member) => member.id === selectedSchoolMemberId) || null;
  const selectedSecondaryDepartment =
    content.faculty.secondaryDepartments.find((department) => department.id === selectedSecondaryDepartmentId) || null;
  const selectedSecondaryMember =
    selectedSecondaryDepartment?.members.find((member) => member.id === selectedSecondaryMemberId) || null;
  const dashboardMetrics = useMemo(
    () => [
      { label: "Gallery", value: content.gallery.length, note: "Live media entries", icon: Camera },
      { label: "Notices", value: content.notices.length, note: "Announcements", icon: Bell },
      {
        label: "School Staff",
        value: content.faculty.schoolStaffCategories.reduce((total, category) => total + category.members.length, 0),
        note: "Faculty profiles",
        icon: Users,
      },
      {
        label: "+2 Staff",
        value: content.faculty.secondaryDepartments.reduce((total, department) => total + department.members.length, 0),
        note: "Department members",
        icon: GraduationCap,
      },
    ],
    [content],
  );

  const updateContent = (updater: (current: SiteContent) => SiteContent) => {
    setContent((current) => updater(current));
    setStatus("Unsaved changes");
  };

  const uploadFile = async (file: File) => {
    const dataUrl = await fileToDataUrl(file);
    return api<{ url: string }>("/api/admin/upload", {
      method: "POST",
      body: JSON.stringify({ fileName: file.name, dataUrl }),
    });
  };

  const uploadAndUse = async (file: File, onUploaded: (url: string) => void, message = "Uploading file...") => {
    setIsSaving(true);
    setStatus(message);
    try {
      const upload = await uploadFile(file);
      onUploaded(upload.url);
      setStatus("Uploaded. Publish to make it live.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsSaving(false);
    }
  };

  const addGalleryImage = (file?: File) => {
    const item: GalleryItem = {
      id: makeId("gal"),
      src: "",
      category: "campus",
      title: file ? file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ") : "New gallery image",
      desc: "Write a short description for this image.",
    };
    updateContent((current) => ({ ...current, gallery: [item, ...current.gallery] }));
    setSelectedGalleryId(item.id);
    if (file) {
      void uploadAndUse(file, (url) => {
        updateContent((current) => ({
          ...current,
          gallery: current.gallery.map((galleryItem) => (galleryItem.id === item.id ? { ...galleryItem, src: url } : galleryItem)),
        }));
      }, "Uploading gallery image...");
    }
  };

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus("");
    try {
      await api("/api/admin/login", { method: "POST", body: JSON.stringify({ password }) });
      setContent(mergeContent(await api<SiteContent>("/api/content")));
      setIsAuthed(true);
      setStatus("Logged in");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsSaving(false);
    }
  };

  const logout = async () => {
    await api("/api/admin/logout", { method: "POST", body: "{}" });
    setIsAuthed(false);
    setPassword("");
  };

  const publish = async () => {
    setIsSaving(true);
    setStatus("Publishing...");
    try {
      const saved = await api<SiteContent>("/api/admin/content", {
        method: "PUT",
        body: JSON.stringify(content),
      });
      setContent(mergeContent(saved));
      setStatus("Published successfully");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Publish failed");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="admin-page grid min-h-screen place-items-center">
        <div className="admin-loading-card">
          <Loader2 className="h-8 w-8 animate-spin text-teal-700" />
          <span>Preparing admin workspace</span>
        </div>
      </main>
    );
  }

  if (!isAuthed) {
    return (
      <main className="admin-login-page">
        <div className="admin-login-shell">
          <section className="admin-login-copy">
            <span className="admin-secure-chip">
              <ShieldCheck className="h-4 w-4" />
              Private school CMS
            </span>
            <h1>Radiant Admin Workspace</h1>
            <p>
              Manage notices, gallery media, and faculty profiles from one focused control room.
            </p>
            <div className="admin-login-proof">
              <span><Database className="h-4 w-4" /> Supabase-ready storage</span>
              <span><LayoutDashboard className="h-4 w-4" /> Responsive editor</span>
              <span><Save className="h-4 w-4" /> Publish workflow</span>
            </div>
          </section>

          <form onSubmit={login} className="admin-login-card">
            <span className="admin-login-icon">
              <KeyRound className="h-6 w-6" />
            </span>
            <h2>Sign in</h2>
            <p>Use the protected admin password to continue.</p>
            <div className="mt-6">
              <Field label="Admin password">
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputClass}
                  placeholder="Enter password"
                  autoFocus
                />
              </Field>
            </div>
            {status ? <p className="admin-status-note">{status}</p> : null}
            <button
              type="submit"
              disabled={isSaving}
              className={`${buttonBase} admin-login-button`}
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page min-h-screen">
      <section className="admin-topbar">
        <div className="container py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="admin-kicker">Radiant CMS</span>
              <h1 className="mt-1 font-display text-2xl font-black text-slate-950 sm:text-3xl">
                Website Content Editor
              </h1>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Private publishing dashboard for school content, notices, media, and faculty profiles.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {status ? (
                <span className="admin-status-pill">
                  <CheckCircle2 className="h-4 w-4" />
                  {status}
                </span>
              ) : null}
              <button type="button" onClick={publish} disabled={isSaving} className={`${buttonBase} admin-publish-button`}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Publish
              </button>
              <button type="button" onClick={logout} className={`${buttonBase} admin-logout-button`}>
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>

          <div className="admin-metrics-grid">
            {dashboardMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="admin-metric-card">
                  <span><Icon className="h-4 w-4" /></span>
                  <strong>{metric.value}</strong>
                  <small>{metric.label}</small>
                  <em>{metric.note}</em>
                </div>
              );
            })}
          </div>

          <div className="admin-tabs-grid">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setQuery("");
                  }}
                  data-active={activeTab === tab.id}
                  className="admin-tab-card"
                >
                  <span>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black text-slate-900">{tab.label}</span>
                    <span className="text-xs font-semibold text-slate-500">{tab.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container py-7">
        {activeTab === "gallery" ? (
          <GalleryAdmin
            items={content.gallery}
            query={query}
            selected={selectedGallery}
            onQuery={setQuery}
            onAdd={addGalleryImage}
            onSelect={setSelectedGalleryId}
            onChange={(item) =>
              updateContent((current) => ({
                ...current,
                gallery: current.gallery.map((galleryItem) => (galleryItem.id === item.id ? item : galleryItem)),
              }))
            }
            onDelete={() => {
              if (!selectedGallery) return;
              updateContent((current) => ({ ...current, gallery: current.gallery.filter((item) => item.id !== selectedGallery.id) }));
              setSelectedGalleryId(null);
            }}
            onUpload={(file) => {
              if (!selectedGallery) return;
              void uploadAndUse(file, (url) => {
                updateContent((current) => ({
                  ...current,
                  gallery: current.gallery.map((item) => (item.id === selectedGallery.id ? { ...item, src: url } : item)),
                }));
              }, "Replacing gallery image...");
            }}
          />
        ) : null}

        {activeTab === "notices" ? (
          <NoticesAdmin
            notices={content.notices}
            query={query}
            selected={selectedNotice}
            onQuery={setQuery}
            onSelect={setSelectedNoticeId}
            onAdd={() => {
              const notice = newNotice();
              updateContent((current) => ({ ...current, notices: [notice, ...current.notices] }));
              setSelectedNoticeId(notice.id);
            }}
            onChange={(notice) =>
              updateContent((current) => ({
                ...current,
                notices: current.notices.map((item) => (item.id === notice.id ? notice : item)),
              }))
            }
            onDelete={() => {
              if (!selectedNotice) return;
              updateContent((current) => ({ ...current, notices: current.notices.filter((notice) => notice.id !== selectedNotice.id) }));
              setSelectedNoticeId(null);
            }}
            onUpload={(file) => {
              if (!selectedNotice) return;
              void uploadAndUse(file, (url) => {
                updateContent((current) => ({
                  ...current,
                  notices: current.notices.map((notice) =>
                    notice.id === selectedNotice.id
                      ? { ...notice, content: { ...notice.content, attachmentUrl: url, attachmentName: file.name } }
                      : notice,
                  ),
                }));
              }, "Uploading notice file...");
            }}
          />
        ) : null}

        {activeTab === "schoolStaff" ? (
          <FacultyAdmin
            mode="schoolStaff"
            categories={content.faculty.schoolStaffCategories}
            selectedCategoryId={selectedSchoolCategoryId}
            selectedMemberId={selectedSchoolMemberId}
            query={query}
            onQuery={setQuery}
            onSelect={(categoryId, memberId) => {
              setSelectedSchoolCategoryId(categoryId);
              setSelectedSchoolMemberId(memberId);
            }}
            onChange={(categories) =>
              updateContent((current) => ({
                ...current,
                faculty: { ...current.faculty, schoolStaffCategories: categories as SchoolStaffCategory[] },
              }))
            }
            onUpload={(file) => {
              if (!selectedSchoolCategory || !selectedSchoolMember) return;
              void uploadAndUse(file, (url) => {
                updateContent((current) => ({
                  ...current,
                  faculty: {
                    ...current.faculty,
                    schoolStaffCategories: current.faculty.schoolStaffCategories.map((category) =>
                      category.id === selectedSchoolCategory.id
                        ? {
                            ...category,
                            members: category.members.map((member) =>
                              member.id === selectedSchoolMember.id ? { ...member, image: url } : member,
                            ),
                          }
                        : category,
                    ),
                  },
                }));
              }, "Uploading staff photo...");
            }}
          />
        ) : null}

        {activeTab === "secondaryStaff" ? (
          <FacultyAdmin
            mode="secondaryStaff"
            categories={content.faculty.secondaryDepartments}
            selectedCategoryId={selectedSecondaryDepartmentId}
            selectedMemberId={selectedSecondaryMemberId}
            query={query}
            onQuery={setQuery}
            onSelect={(categoryId, memberId) => {
              setSelectedSecondaryDepartmentId(categoryId);
              setSelectedSecondaryMemberId(memberId);
            }}
            onChange={(categories) =>
              updateContent((current) => ({
                ...current,
                faculty: { ...current.faculty, secondaryDepartments: categories as SecondaryDepartment[] },
              }))
            }
            onUpload={(file) => {
              if (!selectedSecondaryDepartment || !selectedSecondaryMember) return;
              void uploadAndUse(file, (url) => {
                updateContent((current) => ({
                  ...current,
                  faculty: {
                    ...current.faculty,
                    secondaryDepartments: current.faculty.secondaryDepartments.map((department) =>
                      department.id === selectedSecondaryDepartment.id
                        ? {
                            ...department,
                            members: department.members.map((member) =>
                              member.id === selectedSecondaryMember.id ? { ...member, image: url } : member,
                            ),
                          }
                        : department,
                    ),
                  },
                }));
              }, "Uploading staff photo...");
            }}
          />
        ) : null}
      </section>
    </main>
  );
}

function Toolbar({
  title,
  count,
  query,
  onQuery,
  action,
}: {
  title: string;
  count: number;
  query: string;
  onQuery: (value: string) => void;
  action: React.ReactNode;
}) {
  return (
    <div className="admin-toolbar mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="font-display text-2xl font-black text-slate-950">{title}</h2>
        <p className="text-sm font-semibold text-slate-500">{count} items ready to manage</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="relative block sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(event) => onQuery(event.target.value)} className={`${inputClass} pl-9`} placeholder="Search..." />
        </label>
        {action}
      </div>
    </div>
  );
}

function GalleryAdmin({
  items,
  selected,
  query,
  onQuery,
  onAdd,
  onSelect,
  onChange,
  onDelete,
  onUpload,
}: {
  items: GalleryItem[];
  selected: GalleryItem | null;
  query: string;
  onQuery: (value: string) => void;
  onAdd: (file?: File) => void;
  onSelect: (id: string) => void;
  onChange: (item: GalleryItem) => void;
  onDelete: () => void;
  onUpload: (file: File) => void;
}) {
  const filtered = items.filter((item) => `${item.title} ${item.category} ${item.desc}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <Toolbar
        title="Gallery Editor"
        count={items.length}
        query={query}
        onQuery={onQuery}
        action={
          <label className={`${buttonBase} cursor-pointer bg-teal-700 text-white hover:bg-teal-800`}>
            <ImagePlus className="h-4 w-4" />
            Add Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.currentTarget.value = "";
                onAdd(file);
              }}
            />
          </label>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
        <div className="admin-panel p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4">
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                data-active={selected?.id === item.id}
                className="group overflow-hidden rounded-md border border-slate-200 bg-white text-left transition hover:border-teal-300 data-[active=true]:border-teal-600 data-[active=true]:ring-4 data-[active=true]:ring-teal-100"
              >
                <div className="aspect-[4/3] bg-slate-100">
                  {item.src ? (
                    <img src={item.src} alt="" className="h-full w-full object-cover transition group-hover:scale-[1.03]" />
                  ) : (
                    <div className="grid h-full place-items-center text-slate-300">
                      <Camera className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <span className="block min-w-0 p-3">
                  <span className="block truncate text-sm font-black text-slate-900">{item.title}</span>
                  <span className="mt-0.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{item.category}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {selected ? (
          <div className="admin-panel p-5">
            <div className="grid gap-5">
              <div className="aspect-[16/10] overflow-hidden rounded-lg bg-slate-100">
                {selected.src ? (
                  <img src={selected.src} alt={selected.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-slate-300">
                    <Camera className="h-12 w-12" />
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <label className={`${buttonBase} cursor-pointer border border-dashed border-teal-300 bg-teal-50 text-teal-800`}>
                  <Upload className="h-4 w-4" />
                  Replace Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      event.currentTarget.value = "";
                      if (file) onUpload(file);
                    }}
                  />
                </label>
                <button type="button" onClick={onDelete} className={`${buttonBase} border border-red-200 bg-red-50 text-red-700`}>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
              <Field label="Image title">
                <input value={selected.title} onChange={(event) => onChange({ ...selected, title: event.target.value })} className={inputClass} />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Category">
                  <select
                    value={selected.category}
                    onChange={(event) => onChange({ ...selected, category: event.target.value as GalleryItem["category"] })}
                    className={inputClass}
                  >
                    <option value="campus">Campus</option>
                    <option value="learning">Learning</option>
                    <option value="activities">Activities</option>
                    <option value="events">Events</option>
                  </select>
                </Field>
                <Field label="Image URL">
                  <input value={selected.src} onChange={(event) => onChange({ ...selected, src: event.target.value })} className={inputClass} />
                </Field>
              </div>
              <Field label="Description">
                <textarea value={selected.desc} onChange={(event) => onChange({ ...selected, desc: event.target.value })} className={`${inputClass} min-h-32`} />
              </Field>
            </div>
          </div>
        ) : (
          <EmptyEditor icon={Pencil} title="Select a photo to edit" copy="Choose any gallery image from the grid, or add a new photo first." />
        )}
      </div>
    </>
  );
}

function NoticesAdmin(props: {
  notices: NoticeDocument[];
  selected: NoticeDocument | null;
  query: string;
  onQuery: (value: string) => void;
  onSelect: (id: number) => void;
  onAdd: () => void;
  onChange: (notice: NoticeDocument) => void;
  onDelete: () => void;
  onUpload: (file: File) => void;
}) {
  const filtered = props.notices.filter((notice) =>
    `${notice.title} ${notice.category} ${notice.refNo} ${notice.content.introduction}`.toLowerCase().includes(props.query.toLowerCase()),
  );

  return (
    <>
      <Toolbar
        title="Notice Editor"
        count={props.notices.length}
        query={props.query}
        onQuery={props.onQuery}
        action={
          <button type="button" onClick={props.onAdd} className={`${buttonBase} bg-teal-700 text-white hover:bg-teal-800`}>
            <Plus className="h-4 w-4" />
            Add Notice
          </button>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[390px_1fr]">
        <div className="admin-panel grid max-h-[calc(100vh-260px)] gap-3 overflow-y-auto p-4">
          {filtered.map((notice) => (
            <button
              key={notice.id}
              type="button"
              onClick={() => props.onSelect(notice.id)}
              data-active={props.selected?.id === notice.id}
              className="rounded-md border border-slate-200 p-4 text-left transition hover:bg-slate-50 data-[active=true]:border-teal-500 data-[active=true]:bg-teal-50"
            >
              <span className="block text-sm font-black text-slate-900">{notice.title}</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                {notice.category || "notice"} / {notice.date}
              </span>
            </button>
          ))}
        </div>
        {props.selected ? (
          <NoticeEditor notice={props.selected} onChange={props.onChange} onDelete={props.onDelete} onUploadAttachment={props.onUpload} />
        ) : (
          <EmptyEditor icon={Bell} title="Select a notice to edit" copy="Open any notice from the list, or create a new notice when the school has an update." />
        )}
      </div>
    </>
  );
}

function NoticeEditor({
  notice,
  onChange,
  onDelete,
  onUploadAttachment,
}: {
  notice: NoticeDocument;
  onChange: (notice: NoticeDocument) => void;
  onDelete: () => void;
  onUploadAttachment: (file: File) => void;
}) {
  const update = (patch: Partial<NoticeDocument>) => onChange({ ...notice, ...patch });
  const updateContent = (patch: Partial<NoticeDocument["content"]>) => onChange({ ...notice, content: { ...notice.content, ...patch } });

  return (
    <div className="admin-panel p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-black text-slate-950">Notice Details</h2>
          <p className="mt-1 text-sm text-slate-500">Edit the text and optional attachment, then publish.</p>
        </div>
        <button type="button" onClick={onDelete} className={`${buttonBase} w-fit border border-red-200 bg-red-50 text-red-700`}>
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Notice title">
          <input value={notice.title} onChange={(event) => update({ title: event.target.value })} className={inputClass} />
        </Field>
        <Field label="Notice type">
          <input value={notice.category} onChange={(event) => update({ category: event.target.value })} className={inputClass} placeholder="notice, exam, event..." />
        </Field>
        <Field label="Date">
          <input value={notice.date} onChange={(event) => update({ date: event.target.value })} className={inputClass} />
        </Field>
        <Field label="Published date">
          <input value={notice.publishedDate} onChange={(event) => update({ publishedDate: event.target.value })} className={inputClass} />
        </Field>
        <Field label="Reference no">
          <input value={notice.refNo} onChange={(event) => update({ refNo: event.target.value })} className={inputClass} />
        </Field>
        <Field label="Salutation">
          <input value={notice.content.salutation || ""} onChange={(event) => updateContent({ salutation: event.target.value })} className={inputClass} />
        </Field>
      </div>

      <div className="mt-4 grid gap-4">
        <Field label="Notice body">
          <textarea
            value={notice.content.body || notice.content.introduction}
            onChange={(event) => updateContent({ body: event.target.value, introduction: event.target.value })}
            className={`${inputClass} min-h-48`}
          />
        </Field>
        <div className="grid gap-4 lg:grid-cols-2">
          <Field label="Optional points - one per line">
            <textarea value={arrayToLines(notice.content.bulletPoints)} onChange={(event) => updateContent({ bulletPoints: linesToArray(event.target.value) })} className={`${inputClass} min-h-32`} />
          </Field>
          <Field label="Optional instructions - one per line">
            <textarea value={arrayToLines(notice.content.instructions)} onChange={(event) => updateContent({ instructions: linesToArray(event.target.value) })} className={`${inputClass} min-h-32`} />
          </Field>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Instructions title">
            <input value={notice.content.instructionsTitle || ""} onChange={(event) => updateContent({ instructionsTitle: event.target.value })} className={inputClass} />
          </Field>
          <Field label="Closing line">
            <input value={notice.content.closing || ""} onChange={(event) => updateContent({ closing: event.target.value })} className={inputClass} />
          </Field>
          <Field label="Signatory name">
            <input value={notice.content.signatoryName || ""} onChange={(event) => updateContent({ signatoryName: event.target.value })} className={inputClass} />
          </Field>
          <Field label="Signatory title">
            <input value={notice.content.signatoryTitle || ""} onChange={(event) => updateContent({ signatoryTitle: event.target.value })} className={inputClass} />
          </Field>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className={labelClass}>Optional notice file</p>
              {notice.content.attachmentUrl ? (
                <a href={notice.content.attachmentUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex text-sm font-bold text-teal-700 underline-offset-4 hover:underline">
                  {notice.content.attachmentName || notice.content.attachmentUrl}
                </a>
              ) : (
                <p className="mt-1 text-sm font-semibold text-slate-600">No file attached.</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <label className={`${buttonBase} cursor-pointer bg-teal-700 text-white`}>
                <FileUp className="h-4 w-4" />
                Upload File
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    event.currentTarget.value = "";
                    if (file) onUploadAttachment(file);
                  }}
                />
              </label>
              {notice.content.attachmentUrl ? (
                <button type="button" onClick={() => updateContent({ attachmentUrl: "", attachmentName: "" })} className={`${buttonBase} border border-red-200 bg-red-50 text-red-700`}>
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type EditableCategory = SchoolStaffCategory | SecondaryDepartment;

function FacultyAdmin({
  mode,
  categories,
  selectedCategoryId,
  selectedMemberId,
  query,
  onQuery,
  onSelect,
  onChange,
  onUpload,
}: {
  mode: StaffMode;
  categories: EditableCategory[];
  selectedCategoryId: string | null;
  selectedMemberId: string | null;
  query: string;
  onQuery: (value: string) => void;
  onSelect: (categoryId: string, memberId: string | null) => void;
  onChange: (categories: EditableCategory[]) => void;
  onUpload: (file: File) => void;
}) {
  const selectedCategory = categories.find((category) => category.id === selectedCategoryId) || null;
  const selectedMember = selectedCategory?.members.find((member) => member.id === selectedMemberId) || null;
  const categoryLabel = mode === "schoolStaff" ? "Category" : "Department";
  const memberLabel = mode === "schoolStaff" ? "Staff Member" : "Faculty Member";

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      members: category.members.filter((member) =>
        `${category.title} ${"description" in category ? category.description : category.summary} ${member.name} ${"designation" in member ? member.designation : ""} ${member.expertise || ""}`.toLowerCase().includes(query.toLowerCase()),
      ),
    }))
    .filter((category) => !query || category.members.length || category.title.toLowerCase().includes(query.toLowerCase()));

  const replaceCategory = (category: EditableCategory) => onChange(categories.map((item) => (item.id === category.id ? category : item)));
  const removeCategory = (categoryId: string) => {
    onChange(categories.filter((category) => category.id !== categoryId));
    onSelect("", null);
  };
  const replaceMember = (member: EditableCategory["members"][number]) => {
    if (!selectedCategory) return;
    replaceCategory({
      ...selectedCategory,
      members: selectedCategory.members.map((item) => (item.id === member.id ? member : item)),
    } as EditableCategory);
  };

  const addCategory = () => {
    const category =
      mode === "schoolStaff"
        ? ({
            id: makeId("staff-category"),
            title: "New Staff Category",
            description: "Write a short description for this staff group.",
            icon: "Users",
            members: [],
          } satisfies SchoolStaffCategory)
        : ({
            id: makeId("department"),
            title: "New Department",
            summary: "Write a short summary for this department.",
            icon: "GraduationCap",
            members: [],
          } satisfies SecondaryDepartment);
    onChange([category, ...categories]);
    onSelect(category.id, null);
  };

  const addMember = () => {
    if (!selectedCategory) return;
    const member =
      mode === "schoolStaff"
        ? {
            id: makeId("staff"),
            name: "New Staff Member",
            designation: "Teacher",
            expertise: "",
            officialRole: "Teacher",
            image: "",
          }
        : {
            id: makeId("faculty"),
            name: "New Faculty Member",
            expertise: "Subject / qualification",
            image: "",
          };
    replaceCategory({ ...selectedCategory, members: [member, ...selectedCategory.members] } as EditableCategory);
    onSelect(selectedCategory.id, member.id);
  };

  return (
    <>
      <Toolbar
        title={mode === "schoolStaff" ? "School Staffs Editor" : "Secondary Staffs Editor"}
        count={categories.reduce((sum, category) => sum + category.members.length, 0)}
        query={query}
        onQuery={onQuery}
        action={
          <button type="button" onClick={addCategory} className={`${buttonBase} bg-teal-700 text-white hover:bg-teal-800`}>
            <Plus className="h-4 w-4" />
            Add {categoryLabel}
          </button>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <div className="admin-panel max-h-[calc(100vh-260px)] overflow-y-auto p-4">
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <div key={category.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <button
                  type="button"
                  onClick={() => onSelect(category.id, null)}
                  data-active={selectedCategoryId === category.id && !selectedMemberId}
                  className="flex w-full items-start justify-between gap-3 rounded-md p-2 text-left transition hover:bg-white data-[active=true]:bg-teal-50"
                >
                  <span>
                    <span className="block text-sm font-black text-slate-900">{category.title}</span>
                    <span className="text-xs font-semibold text-slate-500">{category.members.length} members</span>
                  </span>
                  <Pencil className="h-4 w-4 text-slate-400" />
                </button>
                <div className="mt-2 grid gap-2">
                  {category.members.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => onSelect(category.id, member.id)}
                      data-active={selectedMemberId === member.id}
                      className="grid grid-cols-[48px_1fr] gap-3 rounded-md border border-slate-200 bg-white p-2 text-left transition hover:border-teal-300 data-[active=true]:border-teal-500 data-[active=true]:bg-teal-50"
                    >
                      <div className="h-12 w-12 overflow-hidden rounded bg-slate-100">
                        {member.image ? <img src={member.image} alt="" className="h-full w-full object-cover object-top" /> : null}
                      </div>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-black text-slate-900">{member.name}</span>
                        <span className="block truncate text-xs font-semibold text-slate-500">
                          {"designation" in member ? member.designation : member.expertise}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedMember && selectedCategory ? (
          <div className="admin-panel p-5">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="w-full lg:w-72">
                <div className="aspect-[4/3.35] overflow-hidden rounded-lg bg-slate-100">
                  {selectedMember.image ? (
                    <img src={selectedMember.image} alt={selectedMember.name} className="h-full w-full object-cover object-top" />
                  ) : (
                    <div className="grid h-full place-items-center text-slate-300">
                      <Users className="h-12 w-12" />
                    </div>
                  )}
                </div>
                <label className={`${buttonBase} mt-3 w-full cursor-pointer border border-dashed border-teal-300 bg-teal-50 text-teal-800`}>
                  <Upload className="h-4 w-4" />
                  Replace Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      event.currentTarget.value = "";
                      if (file) onUpload(file);
                    }}
                  />
                </label>
              </div>
              <div className="grid flex-1 gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className={labelClass}>{memberLabel}</p>
                    <h3 className="font-display text-2xl font-black text-slate-950">{selectedMember.name}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      replaceCategory({
                        ...selectedCategory,
                        members: selectedCategory.members.filter((member) => member.id !== selectedMember.id),
                      } as EditableCategory);
                      onSelect(selectedCategory.id, null);
                    }}
                    className={`${buttonBase} border border-red-200 bg-red-50 text-red-700`}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
                <Field label="Name">
                  <input value={selectedMember.name} onChange={(event) => replaceMember({ ...selectedMember, name: event.target.value })} className={inputClass} />
                </Field>
                {"designation" in selectedMember ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Designation">
                      <input value={selectedMember.designation} onChange={(event) => replaceMember({ ...selectedMember, designation: event.target.value })} className={inputClass} />
                    </Field>
                    <Field label="Expertise">
                      <input value={selectedMember.expertise || ""} onChange={(event) => replaceMember({ ...selectedMember, expertise: event.target.value })} className={inputClass} />
                    </Field>
                    <Field label="Official role">
                      <input value={selectedMember.officialRole} onChange={(event) => replaceMember({ ...selectedMember, officialRole: event.target.value })} className={inputClass} />
                    </Field>
                    <Field label="Photo URL">
                      <input value={selectedMember.image} onChange={(event) => replaceMember({ ...selectedMember, image: event.target.value })} className={inputClass} />
                    </Field>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Expertise / Qualification">
                      <input value={selectedMember.expertise} onChange={(event) => replaceMember({ ...selectedMember, expertise: event.target.value })} className={inputClass} />
                    </Field>
                    <Field label="Photo URL">
                      <input value={selectedMember.image} onChange={(event) => replaceMember({ ...selectedMember, image: event.target.value })} className={inputClass} />
                    </Field>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : selectedCategory ? (
          <div className="admin-panel p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className={labelClass}>{categoryLabel}</p>
                <h3 className="font-display text-2xl font-black text-slate-950">{selectedCategory.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={addMember} className={`${buttonBase} bg-teal-700 text-white hover:bg-teal-800`}>
                  <Plus className="h-4 w-4" />
                  Add {memberLabel}
                </button>
                <button type="button" onClick={() => removeCategory(selectedCategory.id)} className={`${buttonBase} border border-red-200 bg-red-50 text-red-700`}>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-5 grid gap-4">
              <Field label={`${categoryLabel} title`}>
                <input value={selectedCategory.title} onChange={(event) => replaceCategory({ ...selectedCategory, title: event.target.value } as EditableCategory)} className={inputClass} />
              </Field>
              {"description" in selectedCategory ? (
                <Field label="Description">
                  <textarea value={selectedCategory.description} onChange={(event) => replaceCategory({ ...selectedCategory, description: event.target.value })} className={`${inputClass} min-h-28`} />
                </Field>
              ) : (
                <Field label="Summary">
                  <textarea value={selectedCategory.summary} onChange={(event) => replaceCategory({ ...selectedCategory, summary: event.target.value })} className={`${inputClass} min-h-28`} />
                </Field>
              )}
              <Field label="Icon name">
                <input value={selectedCategory.icon} onChange={(event) => replaceCategory({ ...selectedCategory, icon: event.target.value } as EditableCategory)} className={inputClass} />
              </Field>
            </div>
          </div>
        ) : (
          <EmptyEditor icon={Users} title={`Select a ${categoryLabel.toLowerCase()} or staff member`} copy="Choose a group from the left, then edit the group text or pick a person to edit all their details." />
        )}
      </div>
    </>
  );
}
