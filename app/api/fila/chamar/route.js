import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'fila.json');

export async function POST() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const fila = JSON.parse(data);
    
    if (fila.pacientes.length === 0) {
      return Response.json(
        { sucesso: false, mensagem: 'Não há pacientes na fila' },
        { status: 400 }
      );
    }

    const pacienteChamado = fila.pacientes.shift();
    await fs.writeFile(filePath, JSON.stringify(fila, null, 2), 'utf-8');
    return Response.json({
      sucesso: true,
      pacienteChamado,
      filaAtual: fila.pacientes,
      mensagem: `Paciente ${pacienteChamado.nome} chamado para a sala ${pacienteChamado.sala}`
    });
    
  } catch (error) {
    return Response.json(
      { sucesso: false, erro: error.message },
      { status: 500 }
    );
  }
}