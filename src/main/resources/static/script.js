// ===================== CÓDIGO COMPLETO =====================
document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais
    let clienteSelecionado = null;
    
    // Elementos do DOM com verificação
    const elementos = {
        clienteForm: document.getElementById('clienteForm'),
        contatoForm: document.getElementById('contatoForm'),
        buscaCliente: document.getElementById('buscaCliente'),
        buscaCpf: document.getElementById('buscaCpf'),
        contatoSection: document.getElementById('contatoSection'),
        contatoId: document.getElementById('contatoId'),
        clientesTable: document.getElementById('clientesTable'),
        contatosTable: document.getElementById('contatosTable'),
        clienteIdContato: document.getElementById('clienteIdContato'),
        tipoContato: document.getElementById('tipoContato'),
        valorContato: document.getElementById('valorContato'),
        observacaoContato: document.getElementById('observacaoContato')
        
    };

    // Verificação de elementos críticos
    for (const [key, el] of Object.entries(elementos)) {
        if (!el) {
            console.error(`Elemento não encontrado: ${key}`);
            alert('Erro crítico na inicialização!');
            return;
        }
    } 

    // =============== FUNÇÃO DE BUSCA ===============
    const buscarClientes = async () => {
        const nome = elementos.buscaCliente.value.trim();
        const cpf = elementos.buscaCpf.value; // Mantém a formatação do usuário
        
        try {
            let url = '/api/clientes'; 
            const params = new URLSearchParams();
            
            if (nome || cpf) {
                url = '/api/clientes/buscar?';
                if (nome) params.append('nome', nome);
                if (cpf) params.append('cpf', cpf.replace(/\D/g, '')); // Envia só dígitos (opcional)
            }
            
            const response = await fetch(`${url}${params}`);
            if (!response.ok) throw new Error('Erro na busca');
            
            renderizarClientes(await response.json());
        } catch (error) {
            mostrarErro(error.message);
        }
    };
    // const buscarClientes = async () => {
    //     const nome = elementos.buscaCliente.value.trim();
    //     const cpf = elementos.buscaCpf.value.replace(/\D/g, '');
        
    //     // Adicionar validação de parâmetros
    //     if (!nome && !cpf) {
    //         mostrarErro('Preencha pelo menos um campo para busca.');
    //         return;
    //     }

        
    //     try {
    //         const params = new URLSearchParams();
    //         if (nome) params.append('nome', nome);
    //         if (cpf) params.append('cpf', cpf);
            
    //         const response = await fetch(`/api/clientes/buscar?${params}`);
    //         if (!response.ok) throw new Error('Erro na busca');
            
    //         renderizarClientes(await response.json());
    //     } catch (error) {
    //         mostrarErro(error.message);
    //     }
    // };


    // ===================== FUNÇÕES PRINCIPAIS =====================
    // Exemplo em carregarClientes()
    async function carregarClientes() {
        try {
            const response = await fetch('/api/clientes');
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            const clientes = await response.json();
            renderizarClientes(clientes);
        } catch (error) {
            mostrarErro('Falha ao carregar clientes: ' + error.message);
        }
    }

    async function carregarContatos() {
        if (!clienteSelecionado) return;
        
        try {
            const response = await fetch(`/api/contatos/cliente/${clienteSelecionado.id}`);
            const contatos = await response.json();
            renderizarContatos(contatos);
        } catch (error) {
            mostrarErro('Falha ao carregar contatos: ' + error.message);
        }
    }

    // ===================== RENDERIZAÇÃO =====================
    function renderizarClientes(clientes) {
        const tbody = elementos.clientesTable.querySelector('tbody');
        tbody.innerHTML = clientes.map(cliente => `
            <tr data-id="${cliente.id}">
                <td>${cliente.nome}</td>
                <td>${cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</td>
                <td>${new Date(cliente.dataNascimento).toLocaleDateString('pt-BR')}</td>
                <td>
                    <button class="btn-editar" data-id="${cliente.id}">Editar</button>
                    <button class="btn-excluir" data-id="${cliente.id}">Excluir</button>
                    <button class="btn-contatos" data-id="${cliente.id}">Contatos</button>
                </td>
            </tr>
        `).join('');
    }

    function renderizarContatos(contatos) {
        const tbody = elementos.contatosTable.querySelector('tbody');
        tbody.innerHTML = contatos.map(contato => `
            <tr data-id="${contato.id}">
                <td>${contato.tipo}</td>
                <td>${contato.valor}</td>
                <td>${contato.observacao || ''}</td>
                <td>
                    <button class="btn-editar-contato" data-id="${contato.id}">Editar</button>
                    <button class="btn-excluir-contato" data-id="${contato.id}">Excluir</button>
                </td>
            </tr>
        `).join('');
    }

    // ===================== CRUD CLIENTES =====================
    async function salvarCliente(e) {
        e.preventDefault();
        
        // Limpa o ID se for um novo cliente
        const isNovoCliente = !elementos.clienteForm.clienteId.value;
        
        const clienteData = {
            id: isNovoCliente ? null : elementos.clienteForm.clienteId.value,
            nome: elementos.clienteForm.nome.value,
            cpf: elementos.clienteForm.cpf.value.replace(/\D/g, ''),
            dataNascimento: elementos.clienteForm.dataNascimento.value,
            endereco: elementos.clienteForm.endereco.value
        };
    
        try {
            const response = await fetch(isNovoCliente ? '/api/clientes' : `/api/clientes/${clienteData.id}`, {
                method: isNovoCliente ? 'POST' : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clienteData)
            });
    
            if (!response.ok) throw new Error('Erro ao salvar cliente');
    
            // Limpa o formulário após salvar
            elementos.clienteForm.reset();
            elementos.clienteForm.clienteId.value = ''; // Importante!
            
            await carregarClientes();
            mostrarSucesso('Cliente salvo com sucesso!');
        } catch (error) {
            mostrarErro(error.message);
        }
    }

    async function excluirCliente(id) {
        if (!confirm('Excluir cliente e todos seus contatos?')) return;
        
        try {
            await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
            await carregarClientes();
            elementos.contatoSection.classList.add('hidden');
            mostrarSucesso('Cliente excluído!');
        } catch (error) {
            mostrarErro(error.message);
        }
    }

    // ===================== CRUD CONTATOS =====================
    async function salvarContato(e) {
        e.preventDefault();
        
        const isNovoContato = !elementos.contatoForm.contatoId.value; // Verifica se é novo
        
        const contatoData = {
            id: isNovoContato ? null : elementos.contatoForm.contatoId.value,
            tipo: elementos.tipoContato.value,
            valor: elementos.valorContato.value,
            observacao: elementos.observacaoContato.value,
            clienteId: elementos.clienteIdContato.value
        };
    
        try {
            const response = await fetch(
                isNovoContato ? '/api/contatos' : `/api/contatos/${contatoData.id}`, 
                {
                    method: isNovoContato ? 'POST' : 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...contatoData,
                        cliente: { id: contatoData.clienteId } // Estrutura esperada pelo backend
                    })
                }
            );
    
            if (!response.ok) throw new Error(await response.text());
    
            // Limpeza correta do formulário
            elementos.contatoForm.reset();
            elementos.contatoForm.contatoId.value = ''; // Fundamental!
            
            await carregarContatos();
            mostrarSucesso('Contato salvo com sucesso!');
            
        } catch (error) {
            mostrarErro(error.message);
        }
    }
    // async function salvarContato(e) {
    //     e.preventDefault();
        
    //     const contatoData = {
    //         id: elementos.contatoForm.contatoId?.value || null,
    //         tipo: elementos.tipoContato.value,
    //         valor: elementos.valorContato.value,
    //         observacao: elementos.observacaoContato.value,
    //         clienteId: elementos.clienteIdContato.value // Campo crítico
    //     };
    
    //     try {
    //         const response = await fetch(contatoData.id ? `/api/contatos/${contatoData.id}` : '/api/contatos', {
    //             method: contatoData.id ? 'PUT' : 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 tipo: contatoData.tipo,
    //                 valor: contatoData.valor,
    //                 observacao: contatoData.observacao,
    //                 cliente: { id: contatoData.clienteId } // Estrutura esperada pelo backend
    //             })
    //         });
    
    //         if (!response.ok) {
    //             const error = await response.json();
    //             throw new Error(error.message || 'Erro ao salvar contato');
    //         }
    
    //         elementos.contatoForm.reset();
    //         await carregarContatos();
    //         mostrarSucesso('Contato salvo com sucesso!');
    //     } catch (error) {
    //         mostrarErro(error.message);
    //     }
    // }

    async function excluirContato(id) {
        if (!confirm('Excluir contato permanentemente?')) return;
        
        try {
            await fetch(`/api/contatos/${id}`, { method: 'DELETE' });
            await carregarContatos();
            mostrarSucesso('Contato excluído!');
        } catch (error) {
            mostrarErro(error.message);
        }
    }

    // ===================== FUNÇÕES AUXILIARES =====================
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        
        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[9])) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[10])) return false;
        
        return true;
    }

    function configurarDelegacaoEventos() {
        document.addEventListener('click', async (e) => {
            const target = e.target;
            
            // Verifica se o clique foi em um botão OU em um elemento dentro do botão
            const button = target.closest('button');
            if (!button) return;
    
            // Obtém o ID da linha da tabela (mais robusto)
            const row = button.closest('tr');
            if (!row) return;
            
            const id = row.dataset.id;
            if (!id) return;
    
            // Verificação mais precisa das classes
            const classes = button.classList;
            
            try {
                if (classes.contains('btn-editar')) {
                    await editarCliente(id);
                } 
                else if (classes.contains('btn-excluir')) {
                    await excluirCliente(id);
                } 
                else if (classes.contains('btn-contatos')) {
                    await selecionarCliente(id);
                } 
                else if (classes.contains('btn-editar-contato')) {
                    await editarContato(id);
                } 
                else if (classes.contains('btn-excluir-contato')) {
                    await excluirContato(id);
                }
            } catch (error) {
                console.error('Erro ao processar clique:', error);
                mostrarErro('Ocorreu um erro ao processar esta ação');
            }
        });
    }

   // Modificar a função editarCliente
    async function editarCliente(id) {
        try {
            const response = await fetch(`/api/clientes/${id}`);
            if (!response.ok) {
                mostrarErro(`Cliente não encontrado (Status: ${response.status})`);
                return;
            }
            const text = await response.text();
            const cliente = text ? JSON.parse(text) : null;
            if (cliente) preencherFormularioCliente(cliente);
        } catch (error) {
            mostrarErro(error.message);
        }
    }

    // async function editarContato(id) {
    //     try {
    //         const response = await fetch(`/api/contatos/${id}`);
    //         const contato = await response.json();
    //         preencherFormularioContato(contato);
    //     } catch (error) {
    //         mostrarErro(error.message);
    //     }
    // } 

    async function editarContato(contatoId) {
        try {
            const response = await fetch(`/api/contatos/${contatoId}`);
            if (!response.ok) throw new Error('Contato não encontrado');
            
            const contato = await response.json();
            
            // Preenche o formulário de contato
            elementos.contatoForm.contatoId.value = contato.id;
            elementos.tipoContato.value = contato.tipo;
            elementos.valorContato.value = contato.valor;
            elementos.observacaoContato.value = contato.observacao || '';
            
        } catch (error) {
            console.error('Erro ao editar contato:', error);
            // Não exibir alerta se quiser suprimir a mensagem
        }
    }

    function preencherFormularioCliente(cliente) {
        elementos.clienteForm.clienteId.value = cliente.id;
        elementos.clienteForm.nome.value = cliente.nome;
        elementos.clienteForm.cpf.value = cliente.cpf;
        elementos.clienteForm.dataNascimento.value = cliente.dataNascimento.split('T')[0];
        elementos.clienteForm.endereco.value = cliente.endereco || '';
    }

    function preencherFormularioContato(contato) {
        elementos.contatoForm.contatoId.value = contato.id;
        elementos.tipoContato.value = contato.tipo;
        elementos.valorContato.value = contato.valor;
        elementos.observacao.value = contato.observacao || '';
    }

    async function selecionarCliente(id) {
        try {
            const response = await fetch(`/api/clientes/${id}`);
            clienteSelecionado = await response.json();
            elementos.contatoSection.classList.remove('hidden');
            elementos.clienteIdContato.value = id;
            await carregarContatos();
        } catch (error) {
            mostrarErro(error.message);
        }
    }

    // ===================== INICIALIZAÇÃO =====================
    elementos.clienteForm.addEventListener('submit', salvarCliente);
    elementos.contatoForm.addEventListener('submit', salvarContato);
    elementos.buscaCliente.addEventListener('input', debounce(() => {
        buscarClientes(); // Sem validação prévia
    }, 300));
    
    elementos.buscaCpf.addEventListener('input', debounce(() => {
        buscarClientes(); // Sem validação prévia
    }, 300));

    configurarDelegacaoEventos();
    carregarClientes();
});

// Funções globais
function mostrarErro(mensagem) {
    console.error(mensagem);
    alert('Erro: ' + mensagem);
}

function mostrarSucesso(mensagem) {
    console.log(mensagem);
    alert('Sucesso: ' + mensagem);
}

function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}