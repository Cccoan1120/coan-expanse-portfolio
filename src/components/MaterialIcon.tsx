import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check,
  ChevronDown, ChevronUp, CircleHelp, Code, Copy, Database, Download,
  ExternalLink, Eye, EyeOff, FileText, FlaskConical, GraduationCap,
  Mail, Menu, Mountain, Music, Plus, QrCode, Search, Shield, User, X,
} from "lucide-react";

const icons = {
  add: Plus, arrow_back: ArrowLeft, arrow_downward: ArrowDown,
  arrow_forward: ArrowRight, auto_stories: BookOpen, check: Check,
  close: X, code: Code, content_copy: Copy, database: Database,
  description: FileText, download: Download, expand_less: ChevronUp,
  expand_more: ChevronDown, experiment: FlaskConical, landscape: Mountain,
  mail: Mail, menu: Menu, music_note: Music, north_east: ArrowUpRight,
  open_in_new: ExternalLink, person: User, qr_code_2: QrCode,
  school: GraduationCap, search: Search, shield: Shield,
  visibility: Eye, visibility_off: EyeOff,
};

interface MaterialIconProps {
  children: string;
  className?: string;
}

export function MaterialIcon({ children, className = "" }: MaterialIconProps) {
  const Icon = icons[children as keyof typeof icons] ?? CircleHelp;
  return <Icon className={`material-symbols-outlined ${className}`} aria-hidden="true" focusable="false" strokeWidth={1.75} />;
}
