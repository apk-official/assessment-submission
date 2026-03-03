import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PDF_SAFE_VARS: Record<string, string> = {
  "--background": "#ffffff",
  "--foreground": "#111827",
  "--card": "#ffffff",
  "--card-foreground": "#111827",
  "--popover": "#ffffff",
  "--popover-foreground": "#111827",
  "--primary": "#2563eb",
  "--primary-foreground": "#ffffff",
  "--secondary": "#f3f4f6",
  "--secondary-foreground": "#111827",
  "--muted": "#f3f4f6",
  "--muted-foreground": "#6b7280",
  "--accent": "#f3f4f6",
  "--accent-foreground": "#111827",
  "--destructive": "#ef4444",
  "--border": "#e5e7eb",
  "--input": "#e5e7eb",
  "--ring": "#93c5fd",
  "--sidebar": "#ffffff",
  "--sidebar-foreground": "#111827",
  "--sidebar-border": "#e5e7eb",
};

function applyPdfSafeTheme() {
  const root = document.documentElement;
  const prev: Record<string, string> = {};

  for (const [key, val] of Object.entries(PDF_SAFE_VARS)) {
    prev[key] = root.style.getPropertyValue(key);
    root.style.setProperty(key, val);
  }

  return () => {
    for (const [key, val] of Object.entries(prev)) {
      if (val) root.style.setProperty(key, val);
      else root.style.removeProperty(key);
    }
  };
}

export async function exportElementToPdf(element: HTMLElement, filename = "assessment.pdf") {
  const restore = applyPdfSafeTheme();

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
  } finally {
    restore(); // ✅ always restore theme
  }
}