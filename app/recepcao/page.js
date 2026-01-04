'use client';
import { useState } from 'react';

export default function Recepcao() {
  const [nome, setNome] = useState('');
  const [sala, setSala] = useState('1');
  const [mensagem, setMensagem] = useState('');

  const adicionarPaciente = async () => {
    if (!nome.trim()) {
      setMensagem('Digite o nome do paciente');
      return;
    }

    try {
      const response = await fetch('/api/fila', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), sala })
      });

      const data = await response.json();

      if (response.ok) {
        setNome('');
        setMensagem(`Paciente adicionado à fila`);
      } else {
        setMensagem(`Erro: ${data.erro}`);
      }
    } catch (error) {
      setMensagem(`Erro de conexão`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-light text-gray-800">Recepção</h1>
          <p className="text-gray-500 mt-1">Sistema de Chamada</p>
        </header>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-normal text-gray-700 mb-6">Novo Paciente</h2>

          {mensagem && (
            <div className={`p-4 rounded-lg mb-6 ${mensagem.includes('Erro') ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
              {mensagem}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Nome do Paciente
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && adicionarPaciente()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Consultório
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['1', '2'].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSala(num)}
                    className={`py-3 rounded-lg font-medium ${sala === num ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={adicionarPaciente}
              disabled={!nome.trim()}
              className={`w-full py-4 px-6 rounded-lg font-medium text-lg ${!nome.trim() ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              Adicionar à Fila
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}