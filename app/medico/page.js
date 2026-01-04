'use client';
import { useState, useEffect } from 'react';

export default function MedicoPage() {
  const [fila, setFila] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const buscarFila = async () => {
    try {
      const response = await fetch('/api/fila');
      const data = await response.json();
      setFila(data.pacientes);
    } catch (error) {
      console.error('Erro ao buscar fila:', error);
    }
  };

  const chamarProximo = async () => {
    setCarregando(true);
    setMensagem('');
    
    try {
      const response = await fetch('/api/fila/chamar', {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (data.sucesso) {
        setMensagem(`Paciente ${data.pacienteChamado.nome} chamado`);
        setFila(data.filaAtual);
      } else {
        setMensagem(`Erro: ${data.mensagem || data.erro}`);
      }
    } catch (error) {
      setMensagem(`Erro: ${error.message}`);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarFila();
    const intervalo = setInterval(buscarFila, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light text-gray-800">
            Consultório
          </h1>
          <p className="text-gray-500 mt-2">
            Chamada de Pacientes
          </p>
        </header>

        {mensagem && (
          <div className={`p-4 rounded-lg mb-6 ${mensagem.includes('Erro') ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
            {mensagem}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-normal text-gray-700 mb-4">
            Paciente Atual
          </h2>
          
          {fila.length > 0 ? (
            <div>
              <div className="text-3xl md:text-4xl font-light text-gray-800 mb-2">
                {fila[0].nome}
              </div>
              <div className="text-gray-600 mb-6">
                Consultório {fila[0].sala}
              </div>
              
              <button
                onClick={chamarProximo}
                disabled={carregando}
                className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:bg-gray-300 disabled:text-gray-500"
              >
                {carregando ? 'Chamando...' : 'Chamar Próximo Paciente'}
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-xl text-gray-500">
                Nenhum paciente na fila
              </div>
            </div>
          )}
        </div>

        {fila.length > 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-normal text-gray-700 mb-4">
              Próximos Pacientes
            </h3>
            
            <div className="space-y-3">
              {fila.slice(1).map((paciente) => (
                <div
                  key={paciente.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <div className="font-medium text-gray-800">
                      {paciente.nome}
                    </div>
                    <div className="text-sm text-gray-500">
                      Consultório {paciente.sala}
                    </div>
                  </div>
                  <div className="text-gray-400">
                    Aguardando
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 text-center text-gray-500">
              Total na fila: {fila.length} paciente{fila.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}