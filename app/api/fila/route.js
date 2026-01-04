import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'fila.json');

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const fila = JSON.parse(data);
    
    return Response.json(fila);
    
  } catch (error) {
    return Response.json({ ultimoId: 0, pacientes: [] });
  }
}

export async function POST(request) {
    const data = await fs.readFile(filePath, 'utf-8');
    const fila = JSON.parse(data);
    const body = await request.json();

if (!body.nome || body.nome.trim() === '') {
  return Response.json({ erro: 'Nome é obrigatório' }, { status: 400 });
}

const novoPaciente = {
  id: fila.ultimoId + 1,
  nome: body.nome.trim(),
  sala: body.sala || 'Consultório 1',
  timestamp: new Date().toISOString()
};

fila.pacientes.push(novoPaciente);
fila.ultimoId = novoPaciente.id;
await fs.writeFile(filePath, JSON.stringify(fila, null, 2), 'utf-8');

return Response.json({
  sucesso: true,
  id: novoPaciente.id,
  paciente: novoPaciente,
  mensagem: 'Paciente adicionado à fila'
});
}