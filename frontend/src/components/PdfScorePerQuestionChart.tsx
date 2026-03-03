import { View, Text, StyleSheet } from "@react-pdf/renderer";

type Row = { label: string; score: number | null; max: number };

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  q: { width: 30, fontSize: 10, color: "#6b7280" },
  barTrack: { flex: 1, height: 10, borderRadius: 999, backgroundColor: "#e5e7eb", overflow: "hidden" },
  barFill: { height: "100%" },
  scoreText: { width: 60, fontSize: 10, textAlign: "right", color: "#111827" },
  muted: { color: "#6b7280" },
});
type PdfScorePerQuestionChartProps = {
  /**
   * Array of per-question scoring data.
   * Each row includes a label, score, and maximum possible score.
   */
  data: Row[];
};
/**
 * <PdfScorePerQuestionChart />
 *
 * Renders a per-question score breakdown for PDF reports using
 * horizontal progress bars.
 *
 * Responsibilities:
 * - Displays each question label.
 * - Calculates proportional fill width based on score/max ratio.
 * - Handles null or missing scores gracefully.
 * - Displays numeric score alongside the visual bar.
 *
 * Notes:
 * - Designed specifically for `@react-pdf/renderer`.
 * - Score ratios are clamped between 0 and 1 to ensure safe rendering.
 * - Null scores are displayed as muted placeholders ("—").
 * - This component was created with the help of AI assistance and reviewed to ensure alignment with project requirements.
 */
export default function PdfScorePerQuestionChart({ data }: PdfScorePerQuestionChartProps) {
  return (
    <View style={styles.wrap}>
      {data.map((r) => {
        const pct = r.score == null || r.max <= 0 ? 0 : Math.max(0, Math.min(1, r.score / r.max));
        const fillColor = r.score == null ? "#9ca3af" : "#2563eb";

        return (
          <View key={r.label} style={styles.row}>
            <Text style={styles.q}>{r.label}</Text>

            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${pct * 100}%`, backgroundColor: fillColor }]} />
            </View>

            <Text style={[styles.scoreText, r.score == null ? styles.muted : undefined]}>
              {r.score == null ? "—" : `${r.score}/${r.max}`}
            </Text>
          </View>
        );
      })}
    </View>
  );
}