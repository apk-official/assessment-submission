import { View, Text, StyleSheet } from "@react-pdf/renderer";
/**
 ** <PdfCompletionChart />
 *
 * Renders a completion progress indicator for PDF reports.
 *
 ** Responsibilities:
 * - Displays the numeric completion percentage.
 * - Renders a horizontal progress bar representing completion.
 * - Ensures safe percentage values via internal clamping (0–100).
 *
 ** Notes:
 * - Designed specifically for `@react-pdf/renderer`.
 * - Uses inline width percentage to simulate a progress fill.
 * - Pure presentational component with no side effects.
 * - This component was created with the help of AI assistance and reviewed to ensure alignment with project requirements.
 */
const styles = StyleSheet.create({
  wrap: { gap: 6 },
  percent: { fontSize: 22, fontWeight: 700 },
  track: { height: 10, borderRadius: 999, backgroundColor: "#e5e7eb", overflow: "hidden" },
  fill: { height: "100%", backgroundColor: "#2563eb" },
  label: { fontSize: 10, color: "#6b7280" },
});

export default function PdfCompletionChart({ percentage }: { percentage: number }) {
  const safe = Number.isFinite(percentage) ? Math.max(0, Math.min(100, percentage)) : 0;

  return (
    <View style={styles.wrap}>
      <Text style={styles.percent}>{safe}%</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${safe}%` }]} />
      </View>
      <Text style={styles.label}>Completion</Text>
    </View>
  );
}