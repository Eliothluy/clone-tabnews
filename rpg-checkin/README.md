# Taverna do Dev — RPG Check-in

App gamificado para acompanhar os **53 dias de estudo** do clone do TabNews.

## Funcionalidades

- ✅ **53 missões diárias** com título e resumo de cada aula
- 🎮 **Sistema de XP e níveis** estilo RPG
- 🔥 **Contador de dias seguidos** (streak)
- 📊 **Barra de progresso** e estatísticas
- 💾 **Progresso salvo** automaticamente no `localStorage`
- 🏆 **Dias de boss** com XP bônus (finais de milestone e dias especiais)

## Como rodar

```bash
cd rpg-checkin
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## Estrutura

- `src/data/days.js` — conteúdo dos 53 dias e tabela de níveis
- `src/hooks/useProgress.js` — lógica de XP, níveis e persistência
- `src/components/` — componentes da interface

## Build para produção

```bash
npm run build
npm run preview
```
