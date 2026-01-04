export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Sistema de Chamada para Clínicas
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Sistema completo para gerenciamento de filas em ambientes médicos
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a
            href="/recepcao"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md hover:border-blue-300 transition group block"
          >
            <div className="text-2xl font-normal text-gray-800 mb-3">
              Recepção
            </div>
            <p className="text-gray-600 mb-6">
              Cadastre novos pacientes na fila de espera
            </p>
            <div className="text-blue-600 font-medium group-hover:text-blue-700">
              Acessar →
            </div>
          </a>

          <a
            href="/tv"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md hover:border-blue-300 transition group block"
          >
            <div className="text-2xl font-normal text-gray-800 mb-3">
              Sala de Espera
            </div>
            <p className="text-gray-600 mb-6">
              Visualização para pacientes na sala de espera
            </p>
            <div className="text-blue-600 font-medium group-hover:text-blue-700">
              Acessar →
            </div>
          </a>


          <a
            href="/medico"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md hover:border-blue-300 transition group block"
          >
            <div className="text-2xl font-normal text-gray-800 mb-3">
              Consultório
            </div>
            <p className="text-gray-600 mb-6">
              Controle para chamar próximos pacientes
            </p>
            <div className="text-blue-600 font-medium group-hover:text-blue-700">
              Acessar →
            </div>
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-normal text-gray-800 mb-6">
            Como o sistema funciona
          </h3>
          
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="text-blue-600 text-xl font-medium">1</div>
              </div>
              <div className="font-medium text-gray-700">Recepção</div>
              <div className="text-sm text-gray-500">Adiciona paciente</div>
            </div>
            
            <div className="text-gray-300 text-2xl">→</div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="text-blue-600 text-xl font-medium">2</div>
              </div>
              <div className="font-medium text-gray-700">Fila</div>
              <div className="text-sm text-gray-500">Armazenamento</div>
            </div>
            
            <div className="text-gray-300 text-2xl">→</div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="text-blue-600 text-xl font-medium">3</div>
              </div>
              <div className="font-medium text-gray-700">TV</div>
              <div className="text-sm text-gray-500">Exibição</div>
            </div>
            
            <div className="text-gray-300 text-2xl">→</div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="text-blue-600 text-xl font-medium">4</div>
              </div>
              <div className="font-medium text-gray-700">Médico</div>
              <div className="text-sm text-gray-500">Chamada</div>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm">
            Dados são sincronizados automaticamente entre todas as telas
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>Sistema desenvolvido para clínicas médicas</p>
          <p className="text-sm mt-2">v1.0 • Dados persistidos em tempo real</p>
        </footer>
      </div>
    </div>
  );
}