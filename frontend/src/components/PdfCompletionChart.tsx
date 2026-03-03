import { View, Text, StyleSheet } from "@react-pdf/renderer";

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