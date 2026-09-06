import { Component, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import { modules } from './modules'
import './App.css'

function subscribe(listener: () => void) {
  window.addEventListener('hashchange', listener)
  return () => window.removeEventListener('hashchange', listener)
}
const snapshot = () => window.location.hash.slice(1) || 'overview'

class ModuleBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    return this.state.failed ? <section role="alert"><h1>Unable to display this module</h1><p>Return to the overview or reload the page to try again.</p><a href="#overview">Back to overview</a></section> : this.props.children
  }
}

function App() {
  const page = useSyncExternalStore(subscribe, snapshot)
  const activeModule = modules.find(module => module.id === page)
  const isOverview = page === 'overview'
  return <div className="shell">
    <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus() }}>Skip to content</a>
    <aside className="sidebar">
      <a className="brand" href="#overview"><span className="brand-mark">m.</span><span>modular<span className="brand-subtitle">DEMO WORKSPACE</span></span></a>
      <p className="nav-heading">WORKSPACE</p>
      <nav aria-label="Main navigation">
        <a href="#overview" aria-current={isOverview ? 'page' : undefined}><span aria-hidden="true">◫</span>Overview</a>
        {modules.map(module => <a key={module.id} href={'#' + module.id} aria-current={page === module.id ? 'page' : undefined}><span aria-hidden="true">{module.id === 'products' ? '▦' : '⇄'}</span>{module.label}</a>)}
      </nav>
      <div className="sidebar-footer"><span className="status-dot" />Local demo<span>Shell + React libraries</span></div>
    </aside>
    <div className="shell-body">
      <header className="topbar"><p>Workspace <span>/</span> <strong>{activeModule?.label ?? (isOverview ? 'Overview' : 'Page not found')}</strong></p><span className="build-badge">Shell v{__SHELL_VERSION__}</span></header>
      <main id="main-content" className="workspace" tabIndex={-1}>
        {isOverview && <>
          <div className="overview-heading"><p className="eyebrow">LIBRARY INTEGRATION</p><h1>One workspace. Two modules.</h1><p>Explore each module and review the versions included in this shell.</p></div>
          <div className="module-cards">{modules.map((module, index) => <article className="module-card" key={module.id}>
            <div className="module-card-top"><span className="module-number">0{index + 1}</span><span className="version">v{module.info.version}</span></div>
            <h2>{module.label}</h2><p>{module.description}</p><code>{module.info.name}</code><a className="module-open" href={'#' + module.id}>Open module <span aria-hidden="true">↗</span></a>
          </article>)}</div>
          <section className="composition" aria-labelledby="composition-title"><div className="composition-heading"><h2 id="composition-title">Application composition</h2><span>Build-time integration</span></div><div className="version-table-wrap"><table><thead><tr><th scope="col">Package</th><th scope="col">Installed version</th><th scope="col">Responsibility</th></tr></thead><tbody><tr><td><code>modular-frontend-demo</code></td><td>{__SHELL_VERSION__}</td><td>Navigation and composition</td></tr>{modules.map(module => <tr key={module.id}><td><code>{module.info.name}</code></td><td>{module.info.version}</td><td>{module.description}</td></tr>)}</tbody></table></div><p className="composition-note">Versions are selected when dependencies are installed. To include a new version, update the package and rebuild the shell.</p></section>
        </>}
        {modules.map(module => <div key={module.id} hidden={page !== module.id}><ModuleBoundary><module.Component /></ModuleBoundary></div>)}
        {!isOverview && !activeModule && <section><h1>Page not found</h1><a href="#overview">Back to overview</a></section>}
        <footer className="workspace-footer"><span>Modular frontend demo</span><span>Sample data · No external services connected</span></footer>
      </main>
    </div>
  </div>
}
export default App

