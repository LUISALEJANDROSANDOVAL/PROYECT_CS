const STORAGE_KEYS={PROF:'profesores',STUD:'estudiantes',GRADE:'calificaciones'}
function read(key){return JSON.parse(localStorage.getItem(key)||'[]')}
function write(key,v){localStorage.setItem(key,JSON.stringify(v))}
function addProfesor(nombre,asignatura){const list=read(STORAGE_KEYS.PROF);list.push({id:Date.now(),nombre,asignatura});write(STORAGE_KEYS.PROF,list);renderProfesores()}
function addEstudiante(nombre,grado){const list=read(STORAGE_KEYS.STUD);list.push({id:Date.now(),nombre,grado});write(STORAGE_KEYS.STUD,list);renderEstudiantes()}
function addCalificacion(estId,profId,valor){const list=read(STORAGE_KEYS.GRADE);list.push({id:Date.now(),estId,profId,valor:Number(valor)});write(STORAGE_KEYS.GRADE,list);renderCalificaciones()}
function removeItem(key,id){const list=read(key).filter(i=>i.id!==id);write(key,list);if(key===STORAGE_KEYS.PROF)renderProfesores();if(key===STORAGE_KEYS.STUD)renderEstudiantes();if(key===STORAGE_KEYS.GRADE)renderCalificaciones()}
function renderProfesores(){const el=document.getElementById('profesoresList');if(!el) return;const data=read(STORAGE_KEYS.PROF);el.innerHTML=data.map(p=>`<tr><td>${p.nombre}</td><td>${p.asignatura}</td><td class="actions"><button onclick="removeItem('${STORAGE_KEYS.PROF}',${p.id})" class="btn secondary">Eliminar</button></td></tr>`).join('')}
function renderEstudiantes(){const el=document.getElementById('estudiantesList');if(!el) return;const data=read(STORAGE_KEYS.STUD);el.innerHTML=data.map(s=>`<tr><td>${s.nombre}</td><td>${s.grado}</td><td class="actions"><button onclick="removeItem('${STORAGE_KEYS.STUD}',${s.id})" class="btn secondary">Eliminar</button></td></tr>`).join('')}
function renderCalificaciones(){const el=document.getElementById('calificacionesList');if(!el) return;const grades=read(STORAGE_KEYS.GRADE);const studs=read(STORAGE_KEYS.STUD);const profs=read(STORAGE_KEYS.PROF);
  if(grades.length===0){el.innerHTML='<tr><td colspan="4" class="small">Sin registros</td></tr>';return}
  el.innerHTML=grades.map(g=>{const est=studs.find(s=>s.id===g.estId);const prof=profs.find(p=>p.id===g.profId);return `<tr><td>${est?est.nombre:'-'}</td><td>${prof?prof.nombre:'-'}</td><td>${g.valor}</td><td class="actions"><button onclick="removeItem('${STORAGE_KEYS.GRADE}',${g.id})" class="btn secondary">Eliminar</button></td></tr>`}).join('')
}
function populateSelects(){const sEst=document.getElementById('selEstudiante');const sProf=document.getElementById('selProfesor');if(sEst){sEst.innerHTML=read(STORAGE_KEYS.STUD).map(s=>`<option value="${s.id}">${s.nombre}</option>`).join('')}if(sProf){sProf.innerHTML=read(STORAGE_KEYS.PROF).map(p=>`<option value="${p.id}">${p.nombre} (${p.asignatura})</option>`).join('') }}
window.addEventListener('load',()=>{renderProfesores();renderEstudiantes();renderCalificaciones();populateSelects()});
window.addProfesor=addProfesor;window.addEstudiante=addEstudiante;window.addCalificacion=addCalificacion;window.removeItem=removeItem;window.populateSelects=populateSelects
