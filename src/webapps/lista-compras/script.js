// ==============================================
// CONFIGURAÇÃO DO FIREBASE
// ==============================================
// ATENÇÃO: Substitua as configurações abaixo pelas suas credenciais do Firebase
// Para obter essas informações:
// 1. Acesse https://console.firebase.google.com
// 2. Crie um projeto (ou use um existente)
// 3. Vá em "Configurações do Projeto" > "Geral" > "Seus aplicativos" > "Web"
// 4. Copie o objeto firebaseConfig e cole aqui

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc, 
    doc, 
    onSnapshot,
    query,
    orderBy 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyD3VIOQMkLJ4n78KEl6zaxIJXwFiBJ3Q7Y",
    authDomain: "lista-compras-8db18.firebaseapp.com",
    projectId: "lista-compras-8db18",
    storageBucket: "lista-compras-8db18.firebasestorage.app",
    messagingSenderId: "879517635832",
    appId: "1:879517635832:web:623425285fd64d2385570d",
    measurementId: "G-CH5Q61DWYW"    
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==============================================
// VARIÁVEIS GLOBAIS
// ==============================================
let currentEditId = null;
let linkFieldCounter = 0;
let selectedTags = new Set();

// Mapeamento de cores para tags
const tagColors = {
    'eua': '#2196F3',
    'local': '#4CAF50',
    'urgente': '#f44336',
    'online': '#9C27B0',
    'loja-fisica': '#FF9800',
    'importado': '#00BCD4',
    'nacional': '#8BC34A'
};

// ==============================================
// FUNÇÕES PRINCIPAIS
// ==============================================

// Carregar itens do Firestore em tempo real
function loadItems() {
    const itemsList = document.getElementById('itemsList');
    
    // Query para ordenar por ordem de criação
    const q = query(collection(db, 'compras'));
    
    // Listener em tempo real
    onSnapshot(q, (snapshot) => {
        itemsList.innerHTML = '';
        
        if (snapshot.empty) {
            itemsList.innerHTML = `
                <div class="empty-state">
                    <h3>📦 Nenhum item na lista</h3>
                    <p>Clique em "Adicionar Item" para começar</p>
                </div>
            `;
            updateProgress(0, 0);
            return;
        }

        let totalItems = 0;
        let checkedItems = 0;

        snapshot.forEach((doc) => {
            const item = doc.data();
            totalItems++;
            if (item.comprado) checkedItems++;
            
            const itemCard = createItemCard(doc.id, item);
            itemsList.appendChild(itemCard);
        });

        updateProgress(checkedItems, totalItems);
    }, (error) => {
        console.error("Erro ao carregar itens:", error);
        itemsList.innerHTML = `
            <div class="empty-state">
                <h3>❌ Erro ao carregar</h3>
                <p>Verifique sua configuração do Firebase</p>
                <p style="color: red; font-size: 0.9em;">${error.message}</p>
            </div>
        `;
    });
}

// Criar card de item
function createItemCard(id, item) {
    const card = document.createElement('div');
    card.className = `item-row ${item.comprado ? 'checked' : ''} ${item.status === 'em-discussao' ? 'em-discussao' : ''}`;
    
    const statusBadge = item.status === 'em-discussao' 
        ? '<span class="status-badge status-discussao">⚠️ Em discussão</span>'
        : '<span class="status-badge status-aprovado">✅ Aprovado</span>';
    
    // Criar badges de tags
    let tagsBadges = '';
    if (item.tags && item.tags.length > 0) {
        item.tags.forEach(tag => {
            const color = tagColors[tag.toLowerCase()] || '#757575';
            const icon = getTagIcon(tag);
            tagsBadges += `<span class="tag-badge" style="background-color: ${color}">${icon}${tag}</span>`;
        });
    }
    
    // Lidar com links (novo formato array ou antigo formato string)
    const links = item.links && item.links.length > 0 
        ? item.links 
        : (item.link ? [{ label: 'Ver produto', url: item.link }] : []);
    
    let linkButtons = '';
    if (links.length > 0) {
        if (item.status === 'em-discussao') {
            // Em discussão: botão que abre modal de aviso
            const linksJson = JSON.stringify(links).replace(/"/g, '&quot;');
            linkButtons = `<button class="btn-link" onclick='showWarning(${linksJson}, event)' title="Ver opções (em discussão)">🔗${links.length > 1 ? ` ${links.length}` : ''}</button>`;
        } else {
            // Aprovado: mostrar links diretos
            if (links.length === 1) {
                linkButtons = `<a href="${links[0].url}" target="_blank" rel="noopener noreferrer" class="btn-link" title="${links[0].label}">🔗</a>`;
            } else if (links.length <= 3) {
                links.forEach((link, index) => {
                    linkButtons += `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn-link-multi" title="${link.label}">🏪${index + 1}</a>`;
                });
            } else {
                const linksJson = JSON.stringify(links).replace(/"/g, '&quot;');
                linkButtons = `<button class="btn-link" onclick='showLinksDropdown(${linksJson}, event)' title="Ver ${links.length} opções">🔗 ${links.length}</button>`;
            }
        }
    }
    
    card.innerHTML = `
        <div class="item-main">
            <input 
                type="checkbox" 
                class="item-checkbox"
                ${item.comprado ? 'checked' : ''}
                onchange="toggleCheck('${id}', this.checked)"
            >
            <div class="item-info">
                <span class="item-name">${item.produto}</span>
                <div class="item-meta">
                    <span class="item-qty">Qtd: ${item.quantidade}</span>
                    ${statusBadge}
                    ${tagsBadges}
                </div>
                ${item.observacoes ? `<span class="item-obs">💡 ${item.observacoes}</span>` : ''}
            </div>
            <div class="item-buttons">
                ${linkButtons}
                <button class="btn-edit-small" onclick="editItem('${id}')" title="Editar">✏️</button>
                <button class="btn-delete-small" onclick="deleteItem('${id}')" title="Deletar">🗑️</button>
            </div>
        </div>
    `;
    
    return card;
}

// Obter ícone para tag
function getTagIcon(tag) {
    const icons = {
        'eua': '🇺🇸 ',
        'local': '🇧🇷 ',
        'urgente': '⚡ ',
        'online': '🌐 ',
        'loja-fisica': '🏪 ',
        'importado': '✈️ ',
        'nacional': '🏠 '
    };
    return icons[tag.toLowerCase()] || '🏷️ ';
}

// Atualizar barra de progresso
function updateProgress(checked, total) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    const percentage = total > 0 ? (checked / total) * 100 : 0;
    
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${checked} de ${total} itens comprados`;
}

// Toggle checkbox
window.toggleCheck = async function(id, checked) {
    try {
        const itemRef = doc(db, 'compras', id);
        await updateDoc(itemRef, {
            comprado: checked
        });
    } catch (error) {
        console.error("Erro ao atualizar checkbox:", error);
        alert('Erro ao atualizar item. Tente novamente.');
    }
}

// Adicionar campo de link no formulário
window.addLinkField = function(label = '', url = '') {
    const container = document.getElementById('linksContainer');
    const fieldId = linkFieldCounter++;
    
    const linkField = document.createElement('div');
    linkField.className = 'link-field';
    linkField.id = `linkField${fieldId}`;
    linkField.innerHTML = `
        <input 
            type="text" 
            class="link-label" 
            placeholder="Nome (ex: Amazon, Alternativa 1)" 
            value="${label}"
        >
        <input 
            type="url" 
            class="link-url" 
            placeholder="https://..." 
            value="${url}"
        >
        <button type="button" class="btn-remove-link" onclick="removeLinkField(${fieldId})" title="Remover">❌</button>
    `;
    
    container.appendChild(linkField);
}

// Remover campo de link
window.removeLinkField = function(fieldId) {
    const field = document.getElementById(`linkField${fieldId}`);
    if (field) {
        field.remove();
    }
}

// Coletar links do formulário
function collectLinks() {
    const linkFields = document.querySelectorAll('.link-field');
    const links = [];
    
    linkFields.forEach(field => {
        const label = field.querySelector('.link-label').value.trim();
        const url = field.querySelector('.link-url').value.trim();
        
        if (url) { // Só adiciona se tiver URL
            links.push({
                label: label || 'Ver produto',
                url: url
            });
        }
    });
    
    return links;
}

// Limpar campos de links
function clearLinkFields() {
    document.getElementById('linksContainer').innerHTML = '';
    linkFieldCounter = 0;
}

// Adicionar tag
window.addTag = function(tag) {
    tag = tag.trim().toLowerCase();
    if (!tag) return;
    
    selectedTags.add(tag);
    renderSelectedTags();
    
    // Limpar input personalizado
    const input = document.getElementById('customTagInput');
    if (input) input.value = '';
}

// Remover tag
window.removeTag = function(tag) {
    selectedTags.delete(tag);
    renderSelectedTags();
}

// Renderizar tags selecionadas
function renderSelectedTags() {
    const container = document.getElementById('selectedTags');
    container.innerHTML = '';
    
    selectedTags.forEach(tag => {
        const color = tagColors[tag] || '#757575';
        const icon = getTagIcon(tag);
        
        const tagElement = document.createElement('span');
        tagElement.className = 'tag-badge tag-removable';
        tagElement.style.backgroundColor = color;
        tagElement.innerHTML = `
            ${icon}${tag}
            <button type="button" class="tag-remove" onclick="removeTag('${tag}')">×</button>
        `;
        container.appendChild(tagElement);
    });
}

// Limpar tags
function clearTags() {
    selectedTags.clear();
    renderSelectedTags();
}

// Carregar tags
function loadTags(tags) {
    selectedTags.clear();
    if (tags && Array.isArray(tags)) {
        tags.forEach(tag => selectedTags.add(tag));
    }
    renderSelectedTags();
}

// Handle enter em input de tag personalizada
window.handleTagInput = function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = event.target;
        const tag = input.value.trim().toLowerCase();
        if (tag) {
            addTag(tag);
        }
    }
}

// Mostrar modal de aviso para itens em discussão
window.showWarning = function(links, event) {
    if (event) event.preventDefault();
    
    const container = document.getElementById('warningLinksContainer');
    container.innerHTML = '';
    
    links.forEach(link => {
        const linkButton = document.createElement('a');
        linkButton.href = link.url;
        linkButton.target = '_blank';
        linkButton.rel = 'noopener noreferrer';
        linkButton.className = 'warning-link-button';
        linkButton.innerHTML = `
            <span class="warning-link-label">${link.label}</span>
            <span class="warning-link-icon">🔗</span>
        `;
        container.appendChild(linkButton);
    });
    
    document.getElementById('warningModal').classList.add('show');
}

// Mostrar dropdown de links (para itens aprovados com 4+ links)
window.showLinksDropdown = function(links, event) {
    if (event) event.preventDefault();
    
    const container = document.getElementById('warningLinksContainer');
    const modal = document.getElementById('warningModal');
    
    // Mudar título e texto para modo "aprovado"
    document.querySelector('.warning-header h2').textContent = '🔗 Escolha uma opção';
    document.querySelector('.warning-body p:first-child').innerHTML = '<strong>Múltiplas opções disponíveis</strong>';
    document.querySelector('.warning-body p:nth-child(2)').textContent = 'Escolha uma das lojas/alternativas abaixo:';
    document.querySelector('.warning-body p:nth-child(3)').style.display = 'none';
    
    container.innerHTML = '';
    
    links.forEach(link => {
        const linkButton = document.createElement('a');
        linkButton.href = link.url;
        linkButton.target = '_blank';
        linkButton.rel = 'noopener noreferrer';
        linkButton.className = 'warning-link-button';
        linkButton.innerHTML = `
            <span class="warning-link-label">${link.label}</span>
            <span class="warning-link-icon">🔗</span>
        `;
        container.appendChild(linkButton);
    });
    
    modal.classList.add('show');
}

// Fechar modal de aviso
window.closeWarningModal = function() {
    document.getElementById('warningModal').classList.remove('show');
    
    // Restaurar texto padrão do modal
    setTimeout(() => {
        document.querySelector('.warning-header h2').textContent = '⚠️ Atenção';
        document.querySelector('.warning-body p:first-child').innerHTML = '<strong>Este item ainda está em discussão.</strong>';
        document.querySelector('.warning-body p:nth-child(2)').textContent = 'Não compre ainda. Aguarde a aprovação final.';
        document.querySelector('.warning-body p:nth-child(3)').style.display = 'block';
    }, 300);
}

// Abrir modal para adicionar
window.openModal = function() {
    currentEditId = null;
    document.getElementById('modalTitle').textContent = 'Adicionar Item';
    document.getElementById('itemForm').reset();
    document.getElementById('status').value = 'aprovado'; // Default aprovado
    clearLinkFields();
    addLinkField(); // Adicionar um campo vazio
    clearTags(); // Limpar tags
    document.getElementById('modal').classList.add('show');
}

// Abrir modal para editar
window.editItem = async function(id) {
    try {
        const itemRef = doc(db, 'compras', id);
        const snapshot = await getDocs(query(collection(db, 'compras')));
        
        let itemData = null;
        snapshot.forEach((doc) => {
            if (doc.id === id) {
                itemData = doc.data();
            }
        });

        if (itemData) {
            currentEditId = id;
            document.getElementById('modalTitle').textContent = 'Editar Item';
            document.getElementById('productName').value = itemData.produto;
            document.getElementById('quantity').value = itemData.quantidade;
            document.getElementById('observations').value = itemData.observacoes || '';
            document.getElementById('status').value = itemData.status || 'aprovado';
            
            // Carregar links
            clearLinkFields();
            if (itemData.links && itemData.links.length > 0) {
                itemData.links.forEach(link => {
                    addLinkField(link.label, link.url);
                });
            } else if (itemData.link) {
                // Compatibilidade com formato antigo
                addLinkField('Ver produto', itemData.link);
            } else {
                addLinkField(); // Adicionar um campo vazio
            }
            
            // Carregar tags
            loadTags(itemData.tags || []);
            
            document.getElementById('modal').classList.add('show');
        }
    } catch (error) {
        console.error("Erro ao carregar item para edição:", error);
        alert('Erro ao carregar item. Tente novamente.');
    }
}

// Fechar modal
window.closeModal = function() {
    document.getElementById('modal').classList.remove('show');
    document.getElementById('itemForm').reset();
    clearTags();
    currentEditId = null;
}

// Salvar item (criar ou atualizar)
window.saveItem = async function(event) {
    event.preventDefault();
    
    const produto = document.getElementById('productName').value.trim();
    const quantidade = parseInt(document.getElementById('quantity').value);
    const observacoes = document.getElementById('observations').value.trim();
    const status = document.getElementById('status').value;
    const links = collectLinks();
    
    const itemData = {
        produto,
        quantidade,
        links: links,
        observacoes: observacoes || '',
        status: status,
        tags: Array.from(selectedTags),
        comprado: false
    };
    
    try {
        if (currentEditId) {
            // Atualizar item existente
            const itemRef = doc(db, 'compras', currentEditId);
            const snapshot = await getDocs(query(collection(db, 'compras')));
            
            let keepComprado = false;
            snapshot.forEach((doc) => {
                if (doc.id === currentEditId) {
                    keepComprado = doc.data().comprado;
                }
            });
            
            itemData.comprado = keepComprado;
            await updateDoc(itemRef, itemData);
        } else {
            // Criar novo item
            await addDoc(collection(db, 'compras'), itemData);
        }
        
        closeModal();
    } catch (error) {
        console.error("Erro ao salvar item:", error);
        alert('Erro ao salvar item. Verifique sua conexão e tente novamente.');
    }
}

// Deletar item
window.deleteItem = async function(id) {
    if (!confirm('Tem certeza que deseja deletar este item?')) {
        return;
    }
    
    try {
        await deleteDoc(doc(db, 'compras', id));
    } catch (error) {
        console.error("Erro ao deletar item:", error);
        alert('Erro ao deletar item. Tente novamente.');
    }
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    const warningModal = document.getElementById('warningModal');
    
    if (event.target === modal) {
        closeModal();
    }
    
    if (event.target === warningModal) {
        closeWarningModal();
    }
}

// ==============================================
// INICIALIZAÇÃO
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    loadItems();
});

