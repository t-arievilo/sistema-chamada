'use client';
import { useState, useEffect } from 'react';

export default function TvPage() {
  const [fila, setFila] = useState([]);

  useEffect(() => {
    const buscarFila = async () => {
      try {
        const response = await fetch('/api/fila');
        const data = await response.json();
        setFila(data.pacientes);
      } catch (error) {
        console.error('Erro ao buscar fila:', error);
      }
    };

    buscarFila();
    const intervalo = setInterval(buscarFila, 3000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-light text-center text-gray-100 mb-2">
          Clínica Médica
        </h1>
        <p className="text-gray-400 text-center text-lg">
          Sistema de Chamada
        </p>
      </div>

      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-normal text-center text-gray-300 mb-6">
            Chamando Agora
          </h2>

          {fila.length > 0 ? (
            <div className="text-center">
              <div className="text-5xl md:text-7xl font-light mb-4 text-white">
                {fila[0].nome}
              </div>
              <div className="text-2xl md:text-3xl font-normal text-gray-300">
                Consultório {fila[0].sala}
              </div>
              <div className="mt-6 text-gray-400">
                Dirija-se ao consultório indicado
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-3xl font-light text-gray-400">
                Aguardando Pacientes
              </div>
              <p className="text-gray-500 mt-2">
                A fila está vazia no momento
              </p>
            </div>
          )}
        </div>
      </div>

      {fila.length > 1 && (
        <div className="container mx-auto px-4">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-normal text-center text-gray-300 mb-6">
              Próximos Pacientes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fila.slice(1, 4).map((paciente, index) => (
                <div
                  key={paciente.id}
                  className="bg-gray-700 rounded-xl p-6 text-center border border-gray-600"
                >
                  <div className="text-2xl font-light text-gray-300 mb-2">
                    {index + 2}
                  </div>
                  <div className="text-xl font-normal mb-2">
                    {paciente.nome}
                  </div>
                  <div className="text-gray-400">
                    Consultório {paciente.sala}
                  </div>
                </div>
              ))}
            </div>

            {fila.length > 4 && (
              <div className="mt-6 text-center text-gray-400">
                + {fila.length - 4} paciente(s) aguardando
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}