import { Component, ElementRef, Renderer2, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  imports: [CommonModule, RouterModule],
})
export class ProjectsComponent implements OnInit, OnDestroy {

  private revealObserver!: IntersectionObserver;
  activeSection = 'aiml';
  scrollPercent = 0;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  get totalProjects(): number {
    return this.aiml.length + this.cybersec.length + this.websites.length;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    const sections = ['aiml', 'cybersec', 'websites'];
    const scrollPos = window.scrollY + window.innerHeight / 3;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
        this.activeSection = id;
      }
    }
  }

  scrollToSection(id: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeSection = id;
  }

  // ─── AI / ML ─────────────────────────────────────────────────────────────────
  aiml = [
    {
      title: 'Local RAG Compliance Auditor',
      description:
        'A custom offline RAG pipeline I built to scan security policies, codebases, and compliance standards (OWASP, SOC2, HIPAA) completely locally. Zero cloud APIs, zero data leaving the machine — just pure local intelligence running on ChromaDB, HuggingFace embeddings, and Mistral.',
      repoLink: 'https://github.com/melvinjames1/Local-RAG',
      tags: ['Python', 'LangChain', 'ChromaDB', 'Offline LLM', 'Security Policy Auditing'],
      code: `import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA

def load_documents(file_path):
    loader = PyPDFLoader(file_path)
    return loader.load()

def split_documents(documents):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100
    )
    return splitter.split_documents(documents)

def create_vector_store(chunks):
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory="./chroma_db"
    )
    vectorstore.persist()
    return vectorstore

def load_vector_store():
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    return Chroma(
        persist_directory="./chroma_db",
        embedding_function=embeddings
    )

def create_qa_chain(vectorstore):
    llm = Ollama(model="mistral", temperature=0)
    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=vectorstore.as_retriever(search_kwargs={"k": 5}),
        return_source_documents=True
    )

def main():
    pdf_path = "data/your_pdf.pdf"
    print("Loading PDF...")
    docs   = load_documents(pdf_path)
    chunks = split_documents(docs)

    if not os.path.exists("./chroma_db"):
        print("Creating vector DB...")
        vectorstore = create_vector_store(chunks)
    else:
        print("Loading existing DB...")
        vectorstore = load_vector_store()

    qa_chain = create_qa_chain(vectorstore)
    print("\\nRAG ready (LOCAL). Type 'exit' to quit.\\n")

    while True:
        query = input("Question: ")
        if query.lower() == "exit":
            break
        result = qa_chain.invoke({"query": query})
        print("\\nAnswer:\\n", result["result"])
        print("\\nSources:")
        for doc in result["source_documents"]:
            print("-", doc.metadata.get("source"))
        print("\\n" + "=" * 50 + "\\n")

if __name__ == "__main__":
    main()`,
    },
    {
      title: 'Automated Security Log Classifier',
      description:
        'A smart log classification pipeline using TF-IDF and Logistic Regression. Automatically parses system events, flags suspicious entries, and exports clean predictions way faster than manual auditing.',
      repoLink: 'https://github.com/melvinjames1/Sentiment-Analysis/blob/main/sentimentanalysis.py',
      tags: ['Python', 'Log Classification', 'NLP', 'Security Logs', 'Anomaly Detection'],
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

data = pd.read_csv("yourfilepath")
X = data["Text"]
y = data["Label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

vectorizer = TfidfVectorizer(max_features=5000, stop_words="english")
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf  = vectorizer.transform(X_test)

model = LogisticRegression(max_iter=1000)
model.fit(X_train_tfidf, y_train)

y_pred = model.predict(X_test_tfidf)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")
print(classification_report(y_test, y_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

data["Predicted"] = model.predict(vectorizer.transform(X))
data.to_csv("sentiment_predictions.csv", index=False)
print("Predictions saved to sentiment_predictions.csv")`,
    },
  ];

  // ─── CYBER SECURITY ──────────────────────────────────────────────────────────
  cybersec = [
    {
      title: 'WAVS — CI/CD Pipeline Vulnerability Scanner',
      description:
        'An automated security scanner built for CI/CD integrations. Aggressively tests containerized web apps for SQLi, XSS, insecure headers, and directory listing flaws during pipeline builds — shutting down bad code before it reaches production.',
      repoLink: 'https://github.com/melvinjames1/WAVS',
      tags: ['DevSecOps', 'CI/CD Scanning', 'SQLi / XSS Testing', 'Automation', 'Audit Reports'],
      code: `import urllib.parse
from .vulnerabilities import (
    sql_injection, xss,
    security_headers, directory_listing, port_scanner
)
from .report.html_report import generate_html
from .report.pdf_report import generate_pdf

class Scanner:
    def __init__(self, target):
        self.target = target.rstrip('/')
        self.parsed = urllib.parse.urlparse(self.target)
        if not self.parsed.scheme:
            self.target = 'http://' + self.target
            self.parsed = urllib.parse.urlparse(self.target)

    def run_full_scan(self):
        report = {}
        report['sql_injection']     = sql_injection.test_sql_injection(self.target)
        report['xss']               = xss.test_xss(self.target)
        report['security_headers']  = security_headers.check_security_headers(self.target)
        report['directory_listing'] = directory_listing.check_directory_listing(self.target)

        host = self.parsed.hostname
        report['open_ports'] = port_scanner.scan_ports(host) if host else []

        return report

    def generate_html_report(self, report, filename):
        html = generate_html(report, self.target)
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(html)

    def generate_pdf_report(self, report, filename):
        generate_pdf(report, self.target, filename)`,
    },
    {
      title: 'SQL Injection Sandbox & Secure Coding Tutor',
      description:
        'An interactive training sandbox demonstrating SQL injection vulnerabilities and secure coding remediation. Built to show developers why raw queries break and how parameterised queries prevent auth bypasses.',
      repoLink: 'https://github.com/melvinjames1/SQL-Injection-Test',
      link: 'https://sql-injection-test-liard.vercel.app',
      tags: ['Secure Coding', 'SQL Injection', 'Sandbox', 'DevSecOps Training'],
      code: `-- Hardcoded demo database schema
-- Safe sandboxed environment for SQL injection testing

CREATE TABLE users (
    id       INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role     TEXT DEFAULT 'user'
);

INSERT INTO users VALUES (1, 'admin',   'supersecret123', 'admin');
INSERT INTO users VALUES (2, 'alice',   'password123',    'user');
INSERT INTO users VALUES (3, 'bob',     'qwerty456',      'user');
INSERT INTO users VALUES (4, 'charlie', 'letmein789',     'user');

-- Vulnerable query (intentional — for demo purposes)
-- Input: ' OR '1'='1
SELECT * FROM users
WHERE username = '' OR '1'='1'
  AND password = '';

-- Result: returns ALL rows — auth bypassed
-- Shows exactly how unsanitised input
-- lets attackers dump the entire table.

-- Safe parameterised equivalent:
-- SELECT * FROM users
-- WHERE username = ? AND password = ?`,
    },
  ];

  // ─── WEBSITES ───────────────────────────────────────────────────────────────
  websites = [
    {
      title: 'Pomodoro Timer',
      image: 'assets/pt.png',
      description:
        'A sleek, custom Pomodoro productivity tool I built to optimize my own work intervals. Features clean visual timers, break controls, and zero clutter.',
      link: 'https://pomodoro-timer12.netlify.app/',
      repoLink: 'https://github.com/melvinjames1/pomodoro-timer',
      tags: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Favourite Movie Blog',
      image: 'assets/fmb.png',
      description:
        'An Angular & Tailwind application categorizing favorite movies across Hollywood, Bollywood, and Anime with smooth category filters and responsive layouts.',
      link: 'https://main--myfavouritemoviesblog1.netlify.app/Favourite-Movies-Blog/',
      repoLink: 'https://github.com/melvinjames1/FMB',
      tags: ['Angular', 'Tailwind CSS'],
    },
    {
      title: 'Joke Generator',
      image: 'assets/JokeGen.png',
      description:
        'A fast React app that pulls random jokes from an API using Axios with instant state updates and zero lag.',
      link: 'https://main--jokegenarator.netlify.app/',
      repoLink: 'https://github.com/melvinjames1/joke-generator',
      tags: ['React', 'Axios', 'REST API'],
    },
    {
      title: "Traveller's Guide",
      image: 'assets/Tg.png',
      description:
        'A country info tool powered by the REST Countries API. Type any country name and fetch capital, population, currency, and language data instantly.',
      link: 'https://main--travellersguide576.netlify.app/',
      repoLink: 'https://github.com/melvinjames1',
      tags: ['HTML', 'CSS', 'JavaScript', 'REST API'],
    },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAssets();
    }
    setTimeout(() => this.initReveal(), 100);
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
  }

  private loadAssets(): void {
    const assets = [
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
    ];
    assets.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = this.renderer.createElement('link');
        this.renderer.setAttribute(link, 'rel', 'stylesheet');
        this.renderer.setAttribute(link, 'href', href);
        this.renderer.appendChild(document.head, link);
      }
    });
  }

  private initReveal(): void {
    const els = this.el.nativeElement.querySelectorAll('.reveal') as NodeListOf<HTMLElement>;
    this.revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        (e.target as HTMLElement).classList.toggle('visible', e.isIntersecting);
      }),
      { threshold: 0.08 }
    );
    els.forEach((el) => this.revealObserver.observe(el));
  }

  copyToClipboard(code: string, id: string | number): void {
    navigator.clipboard.writeText(code).then(() => {
      const el = document.getElementById(`message-${id}`);
      if (el) {
        el.textContent = 'Copied!';
        setTimeout(() => (el.textContent = 'Copy'), 2000);
      }
    });
  }
}