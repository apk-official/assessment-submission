import React, { useMemo } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { AssessmentResultsResponse, QuestionAnswer } from "@/types/assessmentResults";
import PdfCompletionChart from "@/components/PdfCompletionChart";
import PdfScorePerQuestionChart from "@/components/PdfScorePerQuestionChart";

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 11, color: "#111827" },
  header: { marginBottom: 14 },
  title: { fontSize: 16, fontWeight: 700 },
  sub: { marginTop: 4, color: "#6b7280" },

  section: { marginTop: 14 },
  sectionTitle: { fontSize: 12, fontWeight: 700, marginBottom: 8 },

  row: { flexDirection: "row", gap: 12 },
  card: { flex: 1, border: "1px solid #e5e7eb", borderRadius: 10, padding: 10 },
  label: { fontSize: 10, color: "#6b7280" },
  value: { fontSize: 12, fontWeight: 700, marginTop: 2 },

  qItem: { borderBottom: "1px solid #f3f4f6", paddingBottom: 8, marginBottom: 8 },
  qTitle: { fontWeight: 700 },
  answerBox: { marginTop: 4, padding: 8, borderRadius: 6, backgroundColor: "#f9fafb" },
  muted: { color: "#6b7280" },
  badge: { marginTop: 4, fontSize: 9, color: "#6b7280" },
});

function formatDate(input?: string | null) {
  if (!input) return "N/A";
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? input : d.toLocaleString();
}

function getQuestionsForSelectedElement(results: AssessmentResultsResponse) {
  const selected = results.instance.element;
  return (
    results.element_scores?.[selected]?.question_answers ??
    Object.values(results.element_scores ?? {})[0]?.question_answers ??
    []
  );
}

function answerText(q: QuestionAnswer) {
  if (q.is_reflection) return q.text_answer ?? "Not answered.";
  if (!q.is_answered) return "Not answered.";
  return q.answer_text ?? "Answered.";
}

export default function AssessmentReportPdf({ results }: { results: AssessmentResultsResponse }) {
  const questions = useMemo(() => getQuestionsForSelectedElement(results), [results]);

  const barData = useMemo(() => {
    // Q1..Qn based on sequence; use max_score per question (0 for reflection)
    return questions
      .sort((a, b) => a.question_sequence - b.question_sequence)
      .map((q) => ({
        label: `Q${q.question_sequence}`,
        score: q.is_reflection ? null : q.answer_value,
        max: q.max_score || 0,
      }));
  }, [questions]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Assessment Results Report</Text>
          <Text style={styles.sub}>
            {results.instance.responder_name} • Instance: {results.instance.id}
          </Text>
          <Text style={styles.sub}>
            Element: {results.instance.element} • Created: {formatDate(results.instance.created_at)}
          </Text>
        </View>

        {/* Overview + Completion chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>

          <View style={styles.row}>
            <View style={styles.card}>
              <Text style={styles.label}>Total Questions</Text>
              <Text style={styles.value}>{results.total_questions}</Text>

              <Text style={[styles.label, { marginTop: 8 }]}>Answered</Text>
              <Text style={styles.value}>{results.answered_questions}</Text>
            </View>

            <View style={styles.card}>
              <PdfCompletionChart percentage={results.completion_percentage} />
            </View>
          </View>
        </View>

        {/* Score + Bar chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scores</Text>

          <View style={styles.row}>
            <View style={styles.card}>
              <Text style={styles.label}>Overall Percentage</Text>
              <Text style={styles.value}>{results.scores.percentage}%</Text>

              <Text style={[styles.label, { marginTop: 8 }]}>Points</Text>
              <Text style={styles.value}>
                {results.scores.total_score}/{results.scores.max_score}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Score per Question</Text>
              <View style={{ marginTop: 8 }}>
                <PdfScorePerQuestionChart data={barData} />
              </View>
            </View>
          </View>
        </View>

        {/* Questions & Answers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions & Answers</Text>

          {questions.map((q) => (
            <View key={q.question_id} style={styles.qItem}>
              <Text style={styles.qTitle}>
                {q.question_sequence}) {q.is_reflection ? "Reflection" : q.question_title}
              </Text>

              {q.is_reflection && q.reflection_prompt ? (
                <Text style={styles.muted}>{q.reflection_prompt}</Text>
              ) : null}

              <View style={styles.answerBox}>
                <Text>{answerText(q)}</Text>
              </View>

              {!q.is_reflection && q.is_answered && q.answer_value != null ? (
                <Text style={styles.badge}>
                  Score: {q.answer_value}/{q.max_score}
                </Text>
              ) : q.is_reflection ? (
                <Text style={styles.badge}>Reflection</Text>
              ) : (
                <Text style={styles.badge}>Unanswered</Text>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}