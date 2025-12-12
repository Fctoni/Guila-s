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
    
    const linkButton = item.link 
        ? (item.status === 'em-discussao' 
            ? `<button class="btn-link" onclick="showWarning('${item.link.replace(/'/g, "\\'")}', event)" title="Ver produto (em discussão)">🔗</button>`
            : `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn-link" title="Ver produto">🔗</a>`)
        : '';
    
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
                </div>
                ${item.observacoes ? `<span class="item-obs">💡 ${item.observacoes}</span>` : ''}
            </div>
            <div class="item-buttons">
                ${linkButton}
                <button class="btn-edit-small" onclick="editItem('${id}')" title="Editar">✏️</button>
                <button class="btn-delete-small" onclick="deleteItem('${id}')" title="Deletar">🗑️</button>
            </div>
        </div>
    `;
    
    return card;
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

// Mostrar modal de aviso para itens em discussão
window.showWarning = function(link, event) {
    if (event) event.preventDefault();
    document.getElementById('warningLink').href = link;
    document.getElementById('warningModal').classList.add('show');
}

// Fechar modal de aviso
window.closeWarningModal = function() {
    document.getElementById('warningModal').classList.remove('show');
}

// Abrir modal para adicionar
window.openModal = function() {
    currentEditId = null;
    document.getElementById('modalTitle').textContent = 'Adicionar Item';
    document.getElementById('itemForm').reset();
    document.getElementById('status').value = 'aprovado'; // Default aprovado
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
            document.getElementById('link').value = itemData.link || '';
            document.getElementById('observations').value = itemData.observacoes || '';
            document.getElementById('status').value = itemData.status || 'aprovado';
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
    currentEditId = null;
}

// Salvar item (criar ou atualizar)
window.saveItem = async function(event) {
    event.preventDefault();
    
    const produto = document.getElementById('productName').value.trim();
    const quantidade = parseInt(document.getElementById('quantity').value);
    const link = document.getElementById('link').value.trim();
    const observacoes = document.getElementById('observations').value.trim();
    const status = document.getElementById('status').value;
    
    const itemData = {
        produto,
        quantidade,
        link: link || '',
        observacoes: observacoes || '',
        status: status,
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

