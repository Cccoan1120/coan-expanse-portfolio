import { useState } from "react";
import { profile } from "../content/profile";
import { MaterialIcon } from "./MaterialIcon";

const socialIcon = {
  douyin: "music_note",
  xiaohongshu: "auto_stories",
} as const;

export function SiteFooter({ onOpenWechat }: { onOpenWechat: () => void }) {
  const [emailVisible, setEmailVisible] = useState(false);
  const socialLinks = profile.socialLinks.filter((link) => link.platform === "douyin" || link.platform === "xiaohongshu");

  return (
    <footer className="site-footer" id="contact">
      <div className="contact-shell page-shell">
        <section className="contact-panel" aria-labelledby="contact-title" data-reveal>
          <div className="contact-panel__intro">
            <p className="contact-kicker"><span>03</span> / CONTACT</p>
            <h2 id="contact-title">一起把想法<br />做成能用的东西。</h2>
            <p>想聊产品、AI 应用、数据分析，或者只是交换一个正在发芽的想法，都欢迎来找我。</p>
          </div>

          <div className="contact-panel__direct" aria-label="直接联系方式">
            <button
              className="contact-card contact-card--email"
              type="button"
              aria-expanded={emailVisible}
              onClick={() => setEmailVisible((visible) => !visible)}
            >
              <span className="contact-card__icon"><MaterialIcon>mail</MaterialIcon></span>
              <span className="contact-card__copy">
                <strong>我的邮箱</strong>
                <small aria-live="polite">{emailVisible ? profile.email : "点击显示邮箱"}</small>
              </span>
              <MaterialIcon className="contact-card__arrow">{emailVisible ? "visibility_off" : "visibility"}</MaterialIcon>
            </button>
            <button className="contact-card" type="button" onClick={onOpenWechat}>
              <span className="contact-card__icon"><MaterialIcon>qr_code_2</MaterialIcon></span>
              <span className="contact-card__copy"><strong>加微信</strong><small>查看我的二维码</small></span>
              <MaterialIcon className="contact-card__arrow">north_east</MaterialIcon>
            </button>
            <a className="contact-card" href={profile.github} target="_blank" rel="noreferrer">
              <span className="contact-card__icon"><MaterialIcon>code</MaterialIcon></span>
              <span className="contact-card__copy"><strong>GitHub</strong><small>Cccoan1120</small></span>
              <MaterialIcon className="contact-card__arrow">north_east</MaterialIcon>
            </a>
            <a className="contact-card" href="/resume/chen-xiaohan-resume.pdf" download>
              <span className="contact-card__icon"><MaterialIcon>description</MaterialIcon></span>
              <span className="contact-card__copy"><strong>简历 PDF</strong><small>下载个人简历</small></span>
              <MaterialIcon className="contact-card__arrow">download</MaterialIcon>
            </a>
          </div>

          <div className="contact-panel__social">
            <div><p>SOCIAL</p><h3>也可以在这些平台找到我。</h3></div>
            <nav aria-label="社交平台">
              {socialLinks.map((link) => (
                <a href={link.href} target="_blank" rel="noreferrer" key={link.platform}>
                  <span className="contact-card__icon"><MaterialIcon>{socialIcon[link.platform as keyof typeof socialIcon]}</MaterialIcon></span>
                  <span className="contact-card__copy"><strong>{link.label}</strong><small>看看我的生活记录</small></span>
                  <MaterialIcon className="contact-card__arrow">north_east</MaterialIcon>
                </a>
              ))}
            </nav>
          </div>
        </section>

        <div className="footer-bottom">
          <div className="footer-brand">
            <div className="footer-brand__title">
              <img className="site-brand-mark" src="/images/brand/coan-expanse-mark.png" alt="" width="64" height="64" />
              <strong>霄汉无垠</strong>
            </div>
            <small>COAN EXPANSE</small>
          </div>
          <p>想出发就出发。空下来，再做点自己会用的东西。</p>
          <p>© {new Date().getFullYear()} 霄汉无垠 COAN EXPANSE</p>
        </div>
      </div>
    </footer>
  );
}
