import { DesignerLayout, Toolbar, CanvasContainer } from "@/features/designer";

export default function DesignerPage() {
  return <DesignerLayout toolbar={<Toolbar />} canvas={<CanvasContainer />} />;
}
