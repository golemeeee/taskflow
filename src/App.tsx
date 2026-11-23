import './App.css'

type Feature = {
  number: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    number: '01',
    title: 'Gerencie suas tarefas',
    description: 'Crie, edite e acompanhe suas atividades em um só lugar.',
  },
  {
    number: '02',
    title: 'Defina suas prioridades',
    description: 'Organize o que precisa ser feito primeiro e acompanhe os prazos.',
  },
  {
    number: '03',
    title: 'Visualize seu progresso',
    description: 'Acompanhe as atividades em um quadro dividido por status.',
  },
]

const columns = [
  { label: 'A fazer', className: 'todo', description: 'Planeje o próximo passo' },
  { label: 'Em andamento', className: 'doing', description: 'Concentre-se na execução' },
  { label: 'Concluída', className: 'done', description: 'Acompanhe suas conquistas' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="content header-content">
          <a className="brand" href="#inicio" aria-label="TaskFlow, voltar ao início">
            <span className="brand-mark" aria-hidden="true">✓</span>
            <span>TaskFlow</span>
          </a>
          <a className="header-link" href="#funcionalidades">Funcionalidades</a>
        </div>
      </header>

      <main id="inicio">
        <section className="hero content" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> ORGANIZE SEU DIA</span>
            <h1 id="hero-heading">Menos distrações.<br /><span>Mais progresso.</span></h1>
            <p>
              Uma maneira simples de visualizar tarefas, prioridades e prazos
              em um único lugar.
            </p>
            <a className="primary-link" href="#funcionalidades">
              Conhecer o projeto <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="preview" aria-label="Prévia conceitual dos estados das tarefas">
            <div className="preview-top">
              <div>
                <span className="preview-overline">VISÃO GERAL</span>
                <h2>Meu quadro</h2>
              </div>
              <span className="preview-tag">Em breve</span>
            </div>
            <p className="preview-note">Exemplo da organização planejada para as tarefas.</p>
            <div className="status-grid">
              {columns.map((column) => (
                <div className="status-card" key={column.className}>
                  <span className={`status-dot ${column.className}`} aria-hidden="true" />
                  <strong>{column.label}</strong>
                  <span>{column.description}</span>
                </div>
              ))}
            </div>
            <div className="preview-footer">Prévia ilustrativa. O gerenciamento de tarefas ainda não está disponível.</div>
          </div>
        </section>

        <section className="features-section" id="funcionalidades" aria-labelledby="features-heading">
          <div className="content">
            <div className="section-heading">
              <span className="section-kicker">O QUE ESTÁ NO PLANO</span>
              <h2 id="features-heading">Um espaço para organizar suas ideias.</h2>
              <p>Estas são as primeiras funcionalidades previstas para o TaskFlow.</p>
            </div>
            <div className="features-grid">
              {features.map((feature) => (
                <article className="feature" key={feature.number}>
                  <span className="feature-number">{feature.number}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <span className="planned-label">Planejado</span>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content footer-content">
          <span>TaskFlow</span>
          <span>React + TypeScript</span>
        </div>
      </footer>
    </div>
  )
}

export default App
