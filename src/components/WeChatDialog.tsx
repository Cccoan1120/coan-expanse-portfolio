import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface WeChatDialogProps {
  open: boolean;
  onClose: () => void;
}

export function WeChatDialog({ open, onClose }: WeChatDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="wechat-dialog"
      aria-labelledby="wechat-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="wechat-dialog__panel">
        <button className="dialog-close" type="button" onClick={onClose} aria-label="关闭微信二维码">
          <X aria-hidden="true" />
        </button>
        <p className="coordinate-label">CONTACT CHANNEL / WECHAT</p>
        <h2 id="wechat-title">加个微信</h2>
        <p>备注“个人网站”就好。</p>
        <img src="/contact/wechat-qr.jpg" alt="陈宵瀚的微信二维码" width="480" height="480" />
      </div>
    </dialog>
  );
}
