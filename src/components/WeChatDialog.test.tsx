import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WeChatDialog } from "./WeChatDialog";

describe("WeChatDialog", () => {
  it("opens and can be closed with its labelled control", () => {
    const onClose = vi.fn();
    const { rerender } = render(<WeChatDialog open={false} onClose={onClose} />);
    rerender(<WeChatDialog open onClose={onClose} />);

    expect(screen.getByRole("dialog")).toHaveAttribute("open");
    fireEvent.click(screen.getByRole("button", { name: "关闭微信二维码" }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
