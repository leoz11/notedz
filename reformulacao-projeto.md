# Reformulação do Projeto - Notedz

## 1. Preparação e Setup Inicial

- [ ] Instalar dependências do Supabase (`@supabase/supabase-js`)
- [ ] Instalar e configurar TailwindCSS (remover styled-components)
- [ ] Criar conta e projeto no Supabase
- [ ] Configurar variáveis de ambiente (.env)

## 2. Configuração do Supabase

- [ ] Criar tabela `users` (se necessário customizar)
- [ ] Criar tabela `notes` com campos: id, user_id, title, content, created_at, updated_at
- [ ] Criar tabela `shared_notes` para compartilhamento: id, note_id, shared_with_user_id, permissions
- [ ] Configurar Row Level Security (RLS) policies
- [ ] Configurar autenticação (email/password, OAuth, etc)

## 3. Sistema de Autenticação

- [ ] Criar contexto de autenticação (AuthContext)
- [ ] Criar página de Login
- [ ] Criar página de Registro
- [ ] Criar página de Recuperação de senha
- [ ] Implementar logout
- [ ] Criar rotas protegidas (PrivateRoute)
- [ ] Adicionar persistência de sessão

## 4. Migração do Backend (localStorage → Supabase)

- [ ] Criar serviço/API para operações de notas
- [ ] Implementar CREATE note (com user_id)
- [ ] Implementar READ notes (filtrar por user_id)
- [ ] Implementar UPDATE note
- [ ] Implementar DELETE note
- [ ] Migrar dados do localStorage (opcional, script de migração)

## 5. Sistema de Compartilhamento

- [ ] Criar UI para compartilhar nota (modal/página)
- [ ] Implementar busca de usuários por email
- [ ] Implementar lógica de compartilhamento (inserir em shared_notes)
- [ ] Criar visualização de "Notas Compartilhadas Comigo"
- [ ] Implementar permissões (somente leitura vs edição)
- [ ] Adicionar indicador visual de notas compartilhadas
- [ ] Implementar remoção de compartilhamento

## 6. Migração para TailwindCSS

- [ ] Remover styled-components do package.json
- [ ] Configurar tailwind.config.js (dark mode, cores personalizadas)
- [ ] Reescrever App.js
- [ ] Reescrever Header.js
- [ ] Reescrever Home.js
- [ ] Reescrever NotePage.js
- [ ] Reescrever NoteList.js
- [ ] Reescrever ConfirmationModal.js
- [ ] Reescrever HelpBox.js
- [ ] Reescrever LanguageToggle.js
- [ ] Reescrever Logo.js
- [ ] Estilizar ReactQuill com Tailwind

## 7. Melhorias de UI/UX

- [ ] Redesenhar layout geral (mais moderno/limpo)
- [ ] Adicionar loading states (spinners, skeletons)
- [ ] Adicionar feedback visual (toasts/notifications)
- [ ] Melhorar responsividade mobile
- [ ] Adicionar animações/transições suaves
- [ ] Melhorar acessibilidade (ARIA labels, keyboard navigation)
- [ ] Adicionar empty states (quando não há notas)
- [ ] Melhorar modal de confirmação
- [ ] Adicionar busca/filtro de notas
- [ ] Implementar ordenação de notas (data, alfabética)
- [ ] Adicionar tags/categorias (opcional)

## 8. Testes e Refinamentos

- [ ] Testar fluxo completo de autenticação
- [ ] Testar CRUD de notas
- [ ] Testar compartilhamento
- [ ] Testar em diferentes dispositivos
- [ ] Otimizar performance
- [ ] Tratar erros e edge cases
- [ ] Atualizar README com novas instruções

---

**Ordem sugerida:** Setup → Autenticação → Backend/CRUD → Migração UI → Compartilhamento → UX
