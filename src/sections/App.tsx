import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Project { title: string; tags?: string[]; dates?: string; summary?: string; bullets?: string[]; link?: string }
interface SiteCfg {
  name: string; tagline?: string; location?: string; email?: string; phone?: string;
  linkedin_url?: string; github_url?: string; github_username?: string; about?: string;
  education?: { school?: string; degree?: string; gpa?: string; dates?: string; location?: string };
  projects?: Project[];
  awards?: { title: string; date?: string }[];
  skills?: Record<string,string[]>;
}

export default function App(){
  const [cfg,setCfg] = useState<SiteCfg|null>(null)
  useEffect(()=>{ fetch('/site.config.json').then(r=>r.json()).then(setCfg) },[])
  if(!cfg) return null
  const gh = cfg.github_url || (cfg.github_username? `https://github.com/${cfg.github_username}`: undefined)

  return (
    <div>
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b">
        <nav className="mx-auto max-w-6xl px-6 h-12 flex items-center gap-5 text-xs uppercase tracking-wider">
          {['About','Projects','Skills','Education','Awards','Contact'].map((s)=> (
            <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-accent">{s}</a>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 grid md:grid-cols-[220px_1fr] gap-10 py-8">
        <aside className="hidden md:block sticky top-16 self-start">
          <div className="font-serif text-base tracking-widest">ANR</div>
          <ul className="mt-3 space-y-2 text-xs uppercase tracking-wider text-gray-500">
            {['About','Projects','Skills','Education','Awards','Contact'].map(s=> (
              <li key={s}><a className="hover:text-black" href={`#${s.toLowerCase()}`}>{s}</a></li>
            ))}
          </ul>
        </aside>

        <div className="space-y-10 max-w-3xl">
          <section id="about" className="space-y-3">
            <h1 className="font-serif text-5xl md:text-6xl">{cfg.name}</h1>
            <p className="text-lg text-gray-600">{cfg.tagline}</p>
            <div className="text-gray-500 text-sm flex gap-3 flex-wrap">
              {[cfg.location,cfg.email,cfg.phone].filter(Boolean).map(x=> <span key={x as string}>{x}</span>)}
            </div>
            <div className="flex gap-2">
              {cfg.linkedin_url && <a href={cfg.linkedin_url} target="_blank" className="px-3 py-1 border rounded-full">LinkedIn</a>}
              {gh && <a href={gh} target="_blank" className="px-3 py-1 border rounded-full">GitHub</a>}
            </div>
            <div className="text-xs uppercase tracking-wider text-gray-500">Email // LinkedIn // GitHub</div>
            {cfg.about && (
              <div className="pt-4">
                <div className="section-title">About</div>
                <p className="mt-3 text-[17px] leading-8 text-gray-800">{cfg.about}</p>
              </div>
            )}
          </section>

          <section id="projects">
            <div className="section-title">Selected Work</div>
            <div className="mt-4 space-y-4">
              {(cfg.projects||[]).map(p=> (
                <motion.article key={p.title} className="card" initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-medium">{p.title} {p.link && <a className="text-accent text-sm" href={p.link} target="_blank" rel="noreferrer">[GitHub]</a>}</h3>
                    <div className="text-xs text-gray-500">{p.dates}</div>
                  </div>
                  {p.summary && <p className="mt-1 text-[15px] text-gray-700">{p.summary}</p>}
                  {p.tags && (
                    <div className="mt-2 flex flex-wrap gap-2">{p.tags.map(t=> <span className="badge" key={t}>{t}</span>)}</div>
                  )}
                  {p.bullets && (
                    <ul className="mt-2 list-disc pl-5 text-[15px] space-y-1">
                      {p.bullets.map(b=> <li key={b}>{b}</li>)}
                    </ul>
                  )}
                </motion.article>
              ))}
            </div>
          </section>

          <section id="skills">
            <div className="section-title">Skills</div>
            <div className="mt-3 grid md:grid-cols-2 gap-3">
              {Object.entries(cfg.skills||{}).map(([k,vals])=> (
                <div key={k} className="card">
                  <div className="text-xs uppercase tracking-wider text-gray-500">{k}</div>
                  <div className="mt-2 flex flex-wrap gap-2">{vals.map(v=> <span key={v} className="badge">{v}</span>)}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="education">
            <div className="section-title">Education</div>
            <div className="card mt-3">
              <div className="font-medium">{cfg.education?.school}</div>
              <div className="text-sm text-gray-500">{cfg.education?.degree} {cfg.education?.gpa && `(GPA: ${cfg.education.gpa})`}</div>
              <div className="text-sm text-gray-500">{cfg.education?.dates} · {cfg.education?.location}</div>
            </div>
          </section>

          <section id="awards">
            <div className="section-title">Awards & Certifications</div>
            <ul className="mt-3 list-disc pl-5">
              {(cfg.awards||[]).map(a=> <li key={a.title}>{a.title} <span className="text-gray-500 text-sm">— {a.date}</span></li>)}
            </ul>
          </section>

          <section id="contact" className="pb-10">
            <div className="section-title">Contact</div>
            <ul className="mt-3 text-[15px]">
              {cfg.email && <li><a href={`mailto:${cfg.email}`} className="underline">{cfg.email}</a></li>}
              {cfg.linkedin_url && <li><a href={cfg.linkedin_url} target="_blank" className="underline">LinkedIn</a></li>}
              {gh && <li><a href={gh} target="_blank" className="underline">GitHub</a></li>}
            </ul>
          </section>
        </div>
      </main>

      <footer className="border-t text-center py-4 text-gray-500 text-sm">© {new Date().getFullYear()} {cfg.name}</footer>
    </div>
  )
}
