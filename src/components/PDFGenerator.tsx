import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontFamily: "Helvetica",
    fontWeight: "normal",
    fontSize: 14,
  },
  title: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    marginBottom: 50,
    marginTop: 50,
    textAlign: "center",
  },
  p: {
    marginBottom: 10,
  },
  section: {
    marginTop: 0,
    marginBottom: 15,
  },
  italic: {
    fontFamily: "Helvetica-Oblique",
    marginBottom: 15,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
});

const PDFGenerator = ({ employee }: any) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${day}.${month}.${year}`;
  console.log("employee", employee);

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.p}>
            <Text style={{ alignSelf: "flex-end" }}>
              Datum: <Text style={styles.bold}>{formattedDate}</Text>
            </Text>
          </View>

          <View style={styles.p}>
            <Text style={styles.title}>
              Standard Arbeitsvertrag
              {"\n"} (für Angestellte und Mitarbeiter ohne Tarifbindung)
            </Text>
          </View>

          <View style={styles.p}>
            <Text>
              Zwischen{" "}
              <Text style={styles.bold}>
                Company GmbH, Hauptstraße 1, 51069 Köln{" "}
              </Text>
            </Text>
            <Text style={{ alignSelf: "flex-end", marginTop: 10 }}>
              - nachfolgend „Arbeitgeber“ genannt -
            </Text>
          </View>
          <Text style={{ marginBottom: 10 }}>und</Text>
          <View style={styles.p}>
            <Text>
              Herrn/Frau{" "}
              <Text style={styles.bold}>
                {employee.firstname} {employee.lastname}
              </Text>
            </Text>
            <Text>
              wohnhaft{" "}
              <Text style={styles.bold}>
                {employee?.address?.street} {employee?.address?.number},{" "}
                {employee?.address?.zip} {employee?.address?.city}
              </Text>
            </Text>
            <Text style={{ alignSelf: "flex-end", marginTop: 10 }}>
              - nachfolgend „Arbeitnehmer/-in“ genannt -
            </Text>
          </View>

          <View style={styles.p}>
            <Text>wird folgender Arbeitsvertrag geschlossen:</Text>
          </View>

          <View style={styles.title}>
            <Text>§ 1 Beginn des Arbeitsverhältnisses</Text>
          </View>

          <View>
            <Text>Das Arbeitsverhältnis beginnt am {formattedDate} .</Text>
          </View>
          <View style={styles.title}>
            <Text>§ 2 Probezeit</Text>
          </View>
          <View>
            <Text style={styles.section}>
              Das Arbeitsverhältnis wird auf unbestimmte Zeit geschlossen. Die
              ersten sechs Monate (oder: drei Monate) gelten als Probezeit.
              Während der Probezeit kann das Arbeitsverhältnis beiderseits mit
              einer Frist von zwei Wochen gekündigt werden.
            </Text>
            <Text style={styles.italic}>oder</Text>
          </View>
          <View>
            <Text style={styles.section}>
              Dieser Vertrag wird auf die Dauer von sechs Monaten (oder: drei
              Monaten) vom ________ bis zum ________ zur Probe abgeschlossen.
              Nach Ablauf dieser Befristung endet das Arbeitsverhältnis, ohne
              dass es einer Kündigung bedarf, wenn nicht bis zu diesem Zeitpunkt
              eine Fortsetzung des Arbeitsverhältnisses vereinbart wird.
              Innerhalb der Probezeit kann das Arbeitsverhältnis mit einer Frist
              von zwei Wochen gekündigt werden, unbeschadet des Rechts zur
              fristlosen Kündigung (befristetes Probearbeitsverhältnis).
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFGenerator;
