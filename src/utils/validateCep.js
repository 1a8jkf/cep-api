/**
 * Valida e normaliza o CEP recebido.
 * Aceita formatos: 00000000 ou 00000-000
 * Retorna o CEP apenas com dígitos (ex: 01001000) ou null se inválido
 */

function normalizeCep (raw) {
  if (!raw || typeof raw !== 'string') return null;
  const digits = raw.replace(/\D/g, '');
  if (!/^\d{8}$/.test(digits)) return null;
  return digits;
}

module.exports = {
  normalizeCep
};
