const STORAGE_KEYS = {
	PROF: 'profesores',
	STUD: 'estudiantes',
	GRADE: 'calificaciones'
};

const SchoolStore = {
	read(key) { return JSON.parse(localStorage.getItem(key) || '[]'); },
	write(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
	add(key, item) { const list = this.read(key); list.push(item); this.write(key, list); },
	remove(key, id) { const list = this.read(key).filter(i => i.id !== id); this.write(key, list); }
};

const Renderer = {
	render(tableId, rowsHtml) {
		const el = document.getElementById(tableId);
		if (!el) return;
		el.innerHTML = rowsHtml;
	},
	profesores() {
		const data = SchoolStore.read(STORAGE_KEYS.PROF);
		const rows = data.map(p => `
			<tr>
				<td>${p.nombre}</td>
				<td>${p.asignatura}</td>
				<td class="actions"><button onclick="SchoolApp.removeItem('${STORAGE_KEYS.PROF}',${p.id})" class="btn secondary">Eliminar</button></td>
			</tr>
		`).join('');
		this.render('profesoresList', rows);
	},
	estudiantes() {
		const data = SchoolStore.read(STORAGE_KEYS.STUD);
		const rows = data.map(s => `
			<tr>
				<td>${s.nombre}</td>
				<td>${s.grado}</td>
				<td class="actions">
					<button onclick="SchoolApp.editEstudiante(${s.id})" class="btn">Editar</button>
					<button onclick="SchoolApp.removeItem('${STORAGE_KEYS.STUD}',${s.id})" class="btn secondary">Eliminar</button>
				</td>
			</tr>
		`).join('');
		this.render('estudiantesList', rows);
	},
	calificaciones() {
		const grades = SchoolStore.read(STORAGE_KEYS.GRADE);
		const studs = SchoolStore.read(STORAGE_KEYS.STUD);
		const profs = SchoolStore.read(STORAGE_KEYS.PROF);
		if (grades.length === 0) { this.render('calificacionesList', '<tr><td colspan="4" class="small">Sin registros</td></tr>'); return; }
		const rows = grades.map(g => {
			const est = studs.find(s => s.id === g.estId);
			const prof = profs.find(p => p.id === g.profId);
			return `
				<tr>
					<td>${est ? est.nombre : '-'}</td>
					<td>${prof ? prof.nombre : '-'}</td>
					<td>${g.valor}</td>
					<td class="actions"><button onclick="SchoolApp.removeItem('${STORAGE_KEYS.GRADE}',${g.id})" class="btn secondary">Eliminar</button></td>
				</tr>
			`;
		}).join('');
		this.render('calificacionesList', rows);
	},
	populateSelects() {
		const sEst = document.getElementById('selEstudiante');
		const sProf = document.getElementById('selProfesor');
		const studs = SchoolStore.read(STORAGE_KEYS.STUD);
		const profs = SchoolStore.read(STORAGE_KEYS.PROF);
		if (sEst) sEst.innerHTML = studs.map(s => `<option value="${s.id}">${s.nombre}</option>`).join('');
		if (sProf) sProf.innerHTML = profs.map(p => `<option value="${p.id}">${p.nombre} (${p.asignatura})</option>`).join('');
	}
};

const SchoolApp = {
	init() { Renderer.profesores(); Renderer.estudiantes(); Renderer.calificaciones(); Renderer.populateSelects(); },
	addProfesor(nombre, asignatura) {
		if (!nombre || !asignatura) return;
		SchoolStore.add(STORAGE_KEYS.PROF, { id: Date.now(), nombre, asignatura });
		Renderer.profesores(); Renderer.populateSelects();
	},
	addEstudiante(nombre, grado) {
		if (!nombre || !grado) return;
		SchoolStore.add(STORAGE_KEYS.STUD, { id: Date.now(), nombre, grado });
		Renderer.estudiantes(); Renderer.populateSelects();
	},

	editEstudiante(id) {
		const list = SchoolStore.read(STORAGE_KEYS.STUD);
		const s = list.find(x => x.id === Number(id));
		if (!s) return;
		const idInput = document.getElementById('estId');
		const nombreInput = document.querySelector('form input[name="nombre"]');
		const gradoInput = document.querySelector('form input[name="grado"]');
		if (idInput) idInput.value = s.id;
		if (nombreInput) nombreInput.value = s.nombre;
		if (gradoInput) gradoInput.value = s.grado;
	},

	saveEstudiante(id, nombre, grado) {
		if (id && id !== '') {
			const list = SchoolStore.read(STORAGE_KEYS.STUD).map(s => {
				if (s.id === Number(id)) return { id: s.id, nombre, grado };
				return s;
			});
			SchoolStore.write(STORAGE_KEYS.STUD, list);
		} else {
			this.addEstudiante(nombre, grado);
		}
		Renderer.estudiantes(); Renderer.populateSelects();
	},
	addCalificacion(estId, profId, valor) {
		if (!estId || !profId || valor === '' || valor === null) return;
		const v = Number(valor);
		if (Number.isNaN(v)) return;
		SchoolStore.add(STORAGE_KEYS.GRADE, { id: Date.now(), estId: Number(estId), profId: Number(profId), valor: v });
		Renderer.calificaciones();
	},
	removeItem(key, id) {
		SchoolStore.remove(key, id);
		if (key === STORAGE_KEYS.PROF) { Renderer.profesores(); Renderer.populateSelects(); }
		if (key === STORAGE_KEYS.STUD) { Renderer.estudiantes(); Renderer.populateSelects(); }
		if (key === STORAGE_KEYS.GRADE) Renderer.calificaciones();
	},
	populateSelects() { Renderer.populateSelects(); }
};

window.SchoolApp = SchoolApp;

window.addEventListener('load', () => SchoolApp.init());

