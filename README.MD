# Recuperação de senha

**RF**
- recuperar senha informando email
- email com instruções de recuperalção de senha
- resetar a senha

**RNF**
- utilizar mailtrap para testar em ambiente de desenv
- amazon ses para envio de emails em producao
- envio de email em segundo plano

**RN**
- tempo de expirar senha temporária em 2hrs
- confirmar nova senha

# Painel do prestador

**RF**
  - listar agendamentos
  - receber notificações
  - visualizar notificações não lidas

**RNF**
  - agendamentos armazenados em cache
  - notificações armazenadas em mongo
  - notificações em socket.io

**RN**
  - status da notificação

# Agendamento de serviços

**RF**
- listar dotos prestadores de serviços cadastrados
- listar horários disponíveis do prestador por mes e por dia
- realizar agendamento com um prestador
**RNF**

- listagem de prestadores armazenada em cache

**RN**
- cada agendamento deve durar 1 hora exatamento
- horario disponivel entres 08 as 18
- validar horário ja ocupado
- validar horários passados
- validar self agendamento

# Atualização do perfil

**RF**
- atualizar nome, email e senha

**RN**
- não pode alterar por outro email já utilizado
- informar senha antiga para cadastrar nova senha
- para atualizar senha confirmar nova senha

# Agendamento dos serviços



