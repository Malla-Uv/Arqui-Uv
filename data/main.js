const data = {
  "Semestre 1": [
    ["Taller Integrado 1", "TI11", 28, 0, "TI", [], ""],
    ["Taller De Autorregulacion", "ARQS11", 2, 0, "SUV", [], ""],
  ],
  "Semestre 2": [
    ["Taller Integrado 2", "TI12", 28, 0, "TI", ["TI11"], ""],
    ["Taller De Nivelación, Comunicación y Lenguaje", "ARQS12", 2, 0, "SUV", ["ARQS11"], ""],
  ],
  "Semestre 3": [
    ["Taller Integrado 3", "TIL21", 26, 0, "TI", ["TI12", "ARQS12", "ARQS11"], ""],
    ["Complementario 1", "ARQC21", 2, 0, "COMP1", ["TI12", "ARQS12"], ""],
    ["Nivelación Inglés", "ARQS21", 2, 0, "SUV", ["TI11", "TI12", "ARQS11", "ARQS12"], ""],
  ],
  "Semestre 4": [
    ["Taller Integrado 4", "TIC21", 26, 0, "TI", ["TIL21"], ""],
    ["Electivo 1", "ARQE21", 2, 0, "E", ["ARQS11", "ARQS12"], ""],
    ["Complementario 2", "ARQC22", 2, 0, "COMP2", ["ARQC21"], ""],
  ],
  "Semestre 5": [
    ["Taller Integrado 5", "TIT21", 26, 0, "TI", ["TIC21"], ""],
    ["Electivo 2", "ARQE22", 2, 0, "E", ["ARQE21"], ""],
    ["Complementario 3", "ARQC23", 2, 0, "COMP3", ["ARQC22"], ""],
  ],
  "Semestre 6": [
    ["Taller Integrado 6 / Finalización De Ciclo 1", "TFC22", 26, 0, "TFC", ["TIT21", "TIC21", "TIL21"], ""],
    ["Vinculación Con El Medio 1", "ARQS22", 4, 0, "SUV", ["ARQS21"], ""],
  ],
  "Semestre 7": [
    ["Taller Integrado 7", "TIT31", 26, 0, "TI", ["TFC22", "ARQS21", "ARQS22", "ARQE21", "ARQE22", "ARQC23"], ""],
    ["Electivo 3", "ARQE31", 2, 0, "E", ["TFC22", "ARQS21", "ARQS22", "ARQE21", "ARQE22", "ARQC23"], ""],
    ["Complementario 4", "ARQC31", 2, 0, "COMP4", ["TFC22", "ARQS21", "ARQS22", "ARQE21", "ARQE22", "ARQC23"], ""],
    ["Vinculación Con El Medio 2", "ARQS31", 2, 0, "SUV", ["ARQS22"], ""],
  ],
  "Semestre 8": [
    ["Taller Integrado 8", "TIC31", 26, 0, "TI", ["TIT31"], ""],
    ["Electivo 4", "ARQE32", 2, 0, "E", ["ARQE31"], ""],
    ["Complementario 5", "ARQC32", 2, 0, "COMP5", ["ARQC31"], ""],
  ],
  "Semestre 9": [
    ["Taller Integrado 9", "TIL31", 26, 0, "TI", ["TIC31"], ""],
    ["Electivo 5", "ARQE33", 2, 0, "E", ["ARQE32"], ""],
    ["Complementario 6", "ARQC33", 2, 0, "COMP6", ["ARQC32"], ""],
  ],
  "Semestre 10": [
    ["Taller Integrado 10 / Finalización De Ciclo 2", "TFC32", 26, 0, "TFC2", ["TIL31"], ""],
    ["Electivo 6", "ARQE34", 2, 0, "E", ["ARQE33"], ""],
  ],
  "Semestre 11": [
    ["Taller Integrado De Titulación 1", "TIT1", 19, 0, "T1", ["TFC32"], ""],
    ["Gestión Profesional", "ARQC41", 3, 0, "GP", ["ARQC31", "ARQC32", "ARQC33"], ""],
    ["Práctica Profesional", "ARQC42", 8, 0, "PP", ["ARQC31", "ARQC32", "ARQC33"], ""],
  ],
  "Semestre 12": [
    ["Taller Integrado De Titulación 2", "TIT2", 30, 0, "T12", ["TIT1"], ""],
  ]
};

const colores = {
  "TI": ["#5cb85c", "Talleres Integrados"],
  "T1": ["#4d908e", "Titulación 1"],
  "T12": ["#1d3557", "Titulación 2"],
  "TFC": ["#90be6d", "Final Ciclo 1"],
  "TFC2": ["#b5e48c", "Final Ciclo 2"],
  "SUV": ["#adb5bd", "Formación común"],
  "COMP1": ["#c08497", "Complementario"],
  "COMP2": ["#c08497", "Complementario"],
  "COMP3": ["#c08497", "Complementario"],
  "COMP4": ["#c08497", "Complementario"],
  "COMP5": ["#c08497", "Complementario"],
  "COMP6": ["#c08497", "Complementario"],
  "E": ["#f4d35e", "Electivos"],
  "GP": ["#8e7dbe", "Gestión Profesional"],
  "PP": ["#f28482", "Práctica Profesional"]
};

new Vue({
  el: "#app",
  data: {
    semestres: datos,
    config: config,
    colores: colores,
    creditosPorTipo: creditos,
    aprobados: JSON.parse(localStorage.getItem("aprobados") || "[]"),
    promedios: JSON.parse(localStorage.getItem("promedios") || "{}"),
    filtro: "todos",
    modo: localStorage.getItem("modo") || "claro",
    notas: [],
    notaDeseada: 4
  },
  computed: {
    totalCreditos() {
      return Object.values(this.creditosPorTipo).reduce((a, b) => a + b, 0);
    },
    creditosAprobados() {
      return this.todasLasAsignaturas()
        .filter(ramo => this.aprobados.includes(ramo[1]))
        .reduce((total, ramo) => total + parseInt(ramo[2]), 0);
    },
    avance() {
      return ((this.creditosAprobados / this.totalCreditos) * 100).toFixed(1);
    },
    promedioGeneral() {
      const notas = Object.values(this.promedios).map(n => parseFloat(n)).filter(n => !isNaN(n));
      if (notas.length === 0) return "-";
      const suma = notas.reduce((a, b) => a + b, 0);
      return (suma / notas.length).toFixed(2);
    },
    ponderacionActual() {
      return this.notas.reduce((sum, n) => sum + (n.porcentaje || 0), 0);
    },
    promedioActual() {
      const total = this.notas.reduce((sum, n) => sum + ((n.nota || 0) * (n.porcentaje || 0)), 0);
      return this.ponderacionActual ? total / this.ponderacionActual : 0;
    },
    notaNecesaria() {
      const restante = 100 - this.ponderacionActual;
      if (restante <= 0) return "Completo";
      const necesaria = ((this.notaDeseada * 100) - (this.promedioActual * this.ponderacionActual)) / restante;
      return necesaria > 7 ? "No alcanza" : necesaria.toFixed(2);
    }
  },
  methods: {
    todasLasAsignaturas() {
      return Object.values(this.semestres).flat();
    },
    cumpleFiltro(ramo) {
      const codigo = ramo[1];
      if (this.filtro === "todos") return true;
      if (this.filtro === "aprobados") return this.aprobados.includes(codigo);
      if (this.filtro === "faltantes") return !this.aprobados.includes(codigo);
      return true;
    },
    estaAprobado(codigo) {
      return this.aprobados.includes(codigo);
    },
    puedeTomarse(ramo) {
      return ramo[5].every(prereq => this.aprobados.includes(prereq));
    },
    cuentaAprobados(prereqs) {
      return prereqs.filter(c => this.aprobados.includes(c)).length;
    },
    toggleAprobado(codigo) {
      const idx = this.aprobados.indexOf(codigo);
      const ramo = this.todasLasAsignaturas().find(r => r[1] === codigo);

      if (idx >= 0) {
        this.aprobados.splice(idx, 1);
        delete this.promedios[codigo];
        if (window.toastr && typeof toastr.warning === "function") {
          toastr.warning(`Desmarcaste ${ramo[0]} (${codigo})`);
        }
      } else if (this.puedeTomarse(ramo)) {
        this.aprobados.push(codigo);
        if (window.toastr && typeof toastr.success === "function") {
          toastr.success(`Aprobaste ${ramo[0]} (${codigo})`);
        }
      }
      this.guardar();
    },
    guardar() {
      localStorage.setItem("aprobados", JSON.stringify(this.aprobados));
      localStorage.setItem("promedios", JSON.stringify(this.promedios));
    },
    resetear() {
      if (confirm("¿Estás seguro que quieres reiniciar tu avance?")) {
        this.aprobados = [];
        this.promedios = {};
        this.guardar();
        if (window.toastr && typeof toastr.info === "function") {
          toastr.info("Avance reiniciado");
        }
      }
    },
    guardarPromedio(codigo, nota) {
      const n = parseFloat(nota);
      if (n >= 1 && n <= 7) {
        this.promedios[codigo] = n.toFixed(2);
        this.guardar();
      } else {
        delete this.promedios[codigo];
      }
    },
    agregarNota() {
      this.notas.push({ nota: null, porcentaje: null });
    },
    eliminarNota(i) {
      this.notas.splice(i, 1);
    },
    getColor(tipo) {
      return this.colores[tipo] || "#3f51b5";
    },
    toggleModo() {
      this.modo = this.modo === "oscuro" ? "claro" : "oscuro";
      document.body.classList.toggle("dark-mode", this.modo === "oscuro");
      localStorage.setItem("modo", this.modo);
    },
    exportarPDF() {
      const opt = {
        margin: 0.2,
        filename: `Malla-Arquitectura-${new Date().toLocaleDateString()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" }
      };
      html2pdf().from(document.body).set(opt).save();
    }
  },
  mounted() {
    if (this.modo === "oscuro") {
      document.body.classList.add("dark-mode");
    }
  }
});
