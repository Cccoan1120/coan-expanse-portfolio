import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main id="main-content" className="not-found page-shell">
      <p className="coordinate-label">404</p>
      <h1>这页什么也没有。</h1>
      <p>可能是链接写错了。先回首页看看吧。</p>
      <Link className="case-link" to="/"><ArrowLeft aria-hidden="true" /> 回首页</Link>
    </main>
  );
}
