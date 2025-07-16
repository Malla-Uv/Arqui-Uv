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
  el: '#app',
  data() {
    return {
      semestres: data,
      colores: colores,
      aprobados: [],
      promedios: {},
      modo: 'claro',
      filtro: 'todos',
      notaDeseada: 4.0,
      notas: [{ nota: null, porcentaje: null }]
    }
  },
  computed: {
    totalCreditos() {
      return this.todosLosRamos().reduce((sum, r) => sum + r[2], 0);
    },
    creditosAprobados() {
      return this.todosLosRamos()
        .filter(r => this.estaAprobado(r[1]))
        .reduce((sum, r) => sum + r[2], 0);
    },
    avance() {
      return Math.round((this.creditosAprobados / this.totalCreditos) * 100);
    },
    promedioGeneral() {
      const vals = Object.values(this.promedios)
        .map(Number)
        .filter(v => !isNaN(v));
      if (!vals.length) return 0;
      return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2);
    },
    ponderacionActual() {
      return this.notas.reduce((sum, it) => sum + (it.porcentaje || 0), 0);
    },
    promedioActual() {
      const suma = this.notas.reduce(
        (sum, it) => sum + ((it.nota || 0) * (it.porcentaje || 0)),
        0
      );
      return this.ponderacionActual > 0
        ? suma / this.ponderacionActual
        : 0;
    },
    notaNecesaria() {
      const restante = 100 - this.ponderacionActual;
      if (restante <= 0) return 0;
      const nota = (this.notaDeseada * 100 - this.promedioActual * this.ponderacionActual) / restante;
      if (nota > 7) return '✘ Nota inalcanzable';
      if (nota < 1) return '✔ Ya aseguraste la nota';
      return nota;
    }
  },
  mounted() {
    // Restaurar todo desde localStorage
    const guardados = localStorage.getItem('aprobados');
    const notasGuardadas = localStorage.getItem('promedios');
    const modoGuardado = localStorage.getItem('modo');

    if (guardados) this.aprobados = JSON.parse(guardados);
    if (notasGuardadas) this.promedios = JSON.parse(notasGuardadas);
    if (modoGuardado) this.modo = modoGuardado;

    document.body.classList.toggle('dark-mode', this.modo === 'oscuro');
  },

  methods: {
    todosLosRamos() {
      return Object.values(this.semestres).flat();
    },
    estaAprobado(codigo) {
      return this.aprobados.includes(codigo);
    },
    puedeTomarse(ramo) {
      const prereqs = ramo[5] || [];
      return prereqs.every(cod => this.aprobados.includes(cod));
    },
    getColor(tipo) {
      if (tipo.startsWith("TI")) return this.colores["TI"][0];
      return this.colores[tipo]?.[0] || "#ccc";
    },
    toggleAprobado(codigo) {
      const ramo = this.todosLosRamos().find(r => r[1] === codigo);
      if (!ramo) return;

      const prereqs = ramo[5] || [];
      const faltan = prereqs.filter(c => !this.aprobados.includes(c));
      if (faltan.length > 0) {
        alert("Debes aprobar primero: " + faltan.join(", "));
        return;
      }

      const i = this.aprobados.indexOf(codigo);
      if (i === -1) {
        this.aprobados.push(codigo);
        toastr.success(`Aprobaste ${ramo[0]} (${codigo})`);

        const nuevos = this.todosLosRamos().filter(r => {
          if (this.estaAprobado(r[1])) return false;
          const prereqs = r[5] || [];
          return prereqs.includes(codigo) && prereqs.every(p => this.aprobados.includes(p));
        });
        nuevos.forEach(r => {
          toastr.info(`🔓 Se desbloqueó: ${r[0]} (${r[1]})`);
        });

      } else {
        this.aprobados.splice(i, 1);
        delete this.promedios[codigo];
        toastr.warning(`Desmarcaste ${codigo}`);
      }

      localStorage.setItem('aprobados', JSON.stringify(this.aprobados));
      localStorage.setItem('promedios', JSON.stringify(this.promedios));
    },
    guardarPromedio(codigo, valor) {
      if (!this.estaAprobado(codigo)) return;
      this.$set(this.promedios, codigo, valor);
      localStorage.setItem('promedios', JSON.stringify(this.promedios));
    },
    resetear() {
      if (!confirm("¿Estás seguro que quieres reiniciar tu avance?")) return;
      this.aprobados = [];
      this.promedios = {};
      this.notas = [{ nota: null, porcentaje: null }];
      localStorage.removeItem('aprobados');
      localStorage.removeItem('promedios');
    },
    toggleModo() {
      this.modo = this.modo === "oscuro" ? "claro" : "oscuro";
      localStorage.setItem("modo", this.modo);
      document.body.classList.toggle("dark-mode", this.modo === "oscuro");
    },
    exportarPDF() {
      const app = document.getElementById("app");
      document.querySelectorAll('.no-print').forEach(el => el.style.display = 'none');
      html2pdf().from(app).save("malla-arquitectura-uv.pdf").then(() => {
        document.querySelectorAll('.no-print').forEach(el => el.style.display = '');
      });
    },
    cumpleFiltro(ramo) {
      if (this.filtro === "todos") return true;
      if (this.filtro === "aprobados") return this.estaAprobado(ramo[1]);
      if (this.filtro === "faltantes") return !this.estaAprobado(ramo[1]);
      return true;
    },
    cuentaAprobados(requisitos) {
      if (!requisitos || requisitos.length === 0) return 0;
      return requisitos.filter(r => this.aprobados.includes(r)).length;
    },
    agregarNota() {
      this.notas.push({ nota: null, porcentaje: null });
    },
    eliminarNota(index) {
      this.notas.splice(index, 1);
    }
  },

  template: `
  <div>
    <!-- PROGRESO Y PROMEDIO GENERAL -->
    <div class="progreso">
      <strong>Avance:</strong> {{ creditosAprobados }} / {{ totalCreditos }} créditos ({{ avance }}%)<br/>
      <strong>Promedio general:</strong> {{ promedioGeneral }}
      <div class="progress-bar">
        <div class="progress-bar-fill" :style="{ width: avance + '%' }"></div>
      </div>
    </div>

    <!-- BOTONES -->
    <div class="botones no-print">
      <button @click="resetear" class="danger">Reiniciar avance</button>
      <button @click="toggleModo" class="toggle-mode">Modo {{ modo === 'oscuro' ? 'Claro' : 'Oscuro' }}</button>
      <button @click="exportarPDF" class="success">Exportar a PDF</button>
      <button @click="filtro = 'todos'">Ver todos</button>
      <button @click="filtro = 'aprobados'">Ver aprobados</button>
      <button @click="filtro = 'faltantes'">Ver faltantes</button>
    </div>

    <!-- MALLA -->
    <div class="malla-horizontal">
      <div v-for="(ramos, semestre) in semestres" :key="semestre" class="semestre">
        <h2>{{ semestre.toUpperCase() }}</h2>
        <div class="ramos">
          <div
            v-for="ramo in ramos"
            v-if="cumpleFiltro(ramo)"
            :key="ramo[1]"
            class="ramo"
            :style="{ backgroundColor: getColor(ramo[4]) }"
            :class="{ 
              aprobado: estaAprobado(ramo[1]), 
              desactivado: !puedeTomarse(ramo)
            }"
            @click="toggleAprobado(ramo[1])"
          >
            <div class="ramo-header">
              <span>{{ ramo[1] }}</span>
              <span>●</span>
            </div>
            <div class="ramo-body">{{ ramo[0] }}</div>
            <div class="ramo-footer">
              <span class="badge">
                {{ cuentaAprobados(ramo[5]) }} / {{ ramo[5]?.length || 0 }}
              </span>
              <span class="badge">{{ ramo[2] }}</span>
            </div>
          </div>
          <!-- Campo nota final -->
          <div
            v-for="ramo in ramos"
            v-if="estaAprobado(ramo[1])"
            :key="'prom-'+ramo[1]"
            class="promedio-input"
          >
            <label>
              {{ ramo[1] }}:
              <input
                type="number"
                v-model.number="promedios[ramo[1]]"
                @change="guardarPromedio(ramo[1], promedios[ramo[1]])"
                min="1"
                max="7"
                step="0.1"
                placeholder="Prom."
              />
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- TABLA DE PROMEDIOS -->
    <div class="tabla-promedios" v-if="aprobados.length">
      <h2>Notas Finales de Ramos Aprobados</h2>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="codigo in aprobados" :key="codigo">
            <td>{{ codigo }}</td>
            <td>{{ todosLosRamos().find(r => r[1] === codigo)?.[0] }}</td>
            <td>
              <input type="number" v-model.number="promedios[codigo]" min="1" max="7" step="0.1" @change="guardarPromedio(codigo, promedios[codigo])">
            </td>
          </tr>
        </tbody>
      </table>
      <p><strong>Promedio General:</strong> {{ promedioGeneral }}</p>
    </div>

    <!-- CALCULADORA DE PROMEDIO -->
    <div class="calculadora">
      <h2>Calculadora de Promedio</h2>
      <div class="formulario-notas">
        <label>Nota que deseas obtener:
          <input type="number" v-model.number="notaDeseada" min="1" max="7" step="0.1" />
        </label>

        <div v-for="(item, index) in notas" :key="index" class="nota-item">
          <label>Nota {{ index + 1 }}:
            <input type="number" v-model.number="item.nota" min="1" max="7" step="0.1" />
          </label>
          <label>Ponderación (%):
            <input type="number" v-model.number="item.porcentaje" min="0" max="100" />
          </label>
          <button @click="eliminarNota(index)" class="danger">X</button>
        </div>

        <button @click="agregarNota" class="success">Agregar nota</button>
      </div>

      <div class="resultados">
        <p><strong>Promedio actual:</strong> {{ promedioActual.toFixed(2) }}</p>
        <p><strong>Ponderación total:</strong> {{ ponderacionActual }}%</p>
        <p v-if="ponderacionActual < 100">
          Necesitas 
          <strong v-if="typeof notaNecesaria === 'number'">{{ notaNecesaria.toFixed(2) }}</strong>
          <strong v-else>{{ notaNecesaria }}</strong>
          en el {{ 100 - ponderacionActual }}% restante.
        </p>
        <p v-else-if="ponderacionActual === 100">
          ¡Ya completaste el 100%! Promedio final estimado: {{ promedioActual.toFixed(2) }}
        </p>
        <p v-else style="color: red;">La ponderación excede el 100%. Revisa los datos.</p>
      </div>
    </div>
  </div>
  `
});
