# Guia de Setup do Supabase

## 1. Criar Conta e Projeto

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta (ou faça login)
3. Clique em "New Project"
4. Preencha:
   - Nome do projeto: `notedz` (ou o que preferir)
   - Database Password: (escolha uma senha forte)
   - Region: escolha a mais próxima (ex: South America - São Paulo)
5. Aguarde a criação do projeto (~2 minutos)

## 2. Obter Credenciais

1. No dashboard do projeto, vá em **Settings** → **API**
2. Copie:
   - **Project URL** → cole no `.env` como `REACT_APP_SUPABASE_URL`
   - **anon public** key → cole no `.env` como `REACT_APP_SUPABASE_ANON_KEY`

## 3. Criar Tabelas

Vá em **SQL Editor** e execute os seguintes comandos:

### Tabela de Notas

```sql
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(50) NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para melhorar performance
CREATE INDEX notes_user_id_idx ON notes(user_id);
```

### Tabela de Compartilhamento

```sql
CREATE TABLE shared_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  note_id UUID REFERENCES notes(id) ON DELETE CASCADE NOT NULL,
  shared_with_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  permission VARCHAR(10) DEFAULT 'read' CHECK (permission IN ('read', 'write')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(note_id, shared_with_user_id)
);

-- Índices
CREATE INDEX shared_notes_note_id_idx ON shared_notes(note_id);
CREATE INDEX shared_notes_user_id_idx ON shared_notes(shared_with_user_id);
```

## 4. Configurar Row Level Security (RLS)

Execute no SQL Editor:

```sql
-- Habilitar RLS nas tabelas
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_notes ENABLE ROW LEVEL SECURITY;

-- Policies para NOTES
-- Usuários podem ver suas próprias notas
CREATE POLICY "Users can view own notes"
  ON notes FOR SELECT
  USING (auth.uid() = user_id);

-- Usuários podem ver notas compartilhadas com eles
CREATE POLICY "Users can view shared notes"
  ON notes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM shared_notes
      WHERE shared_notes.note_id = notes.id
      AND shared_notes.shared_with_user_id = auth.uid()
    )
  );

-- Usuários podem criar suas próprias notas
CREATE POLICY "Users can create own notes"
  ON notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Usuários podem atualizar suas próprias notas
CREATE POLICY "Users can update own notes"
  ON notes FOR UPDATE
  USING (auth.uid() = user_id);

-- Usuários podem atualizar notas compartilhadas com permissão de escrita
CREATE POLICY "Users can update shared notes with write permission"
  ON notes FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM shared_notes
      WHERE shared_notes.note_id = notes.id
      AND shared_notes.shared_with_user_id = auth.uid()
      AND shared_notes.permission = 'write'
    )
  );

-- Usuários podem deletar suas próprias notas
CREATE POLICY "Users can delete own notes"
  ON notes FOR DELETE
  USING (auth.uid() = user_id);

-- Policies para SHARED_NOTES
-- Donos das notas podem ver compartilhamentos
CREATE POLICY "Note owners can view shares"
  ON shared_notes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM notes
      WHERE notes.id = shared_notes.note_id
      AND notes.user_id = auth.uid()
    )
  );

-- Donos das notas podem criar compartilhamentos
CREATE POLICY "Note owners can create shares"
  ON shared_notes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM notes
      WHERE notes.id = shared_notes.note_id
      AND notes.user_id = auth.uid()
    )
  );

-- Donos das notas podem deletar compartilhamentos
CREATE POLICY "Note owners can delete shares"
  ON shared_notes FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM notes
      WHERE notes.id = shared_notes.note_id
      AND notes.user_id = auth.uid()
    )
  );
```

## 5. Configurar Autenticação

1. Vá em **Authentication** → **Providers**
2. Habilite **Email** (já vem habilitado por padrão)
3. (Opcional) Configure outros providers: Google, GitHub, etc.

## 6. Testar Conexão

Após configurar o `.env`, reinicie o servidor de desenvolvimento:

```bash
npm start
```

Verifique no console se não há erros de conexão com o Supabase.
