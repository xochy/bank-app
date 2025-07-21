/**
 * Interfaz para representar una Institución (Banco).
 */
export interface Institution {
  id: number;
  name: string;
  type: string;
  website: string;
  display_name: string;
  country_codes: string[];
  primary_color: string;
  logo: string;
  icon_logo: string;
  text_logo: string;
  status: string;
}

/**
 * Interfaz para representar el balance de una cuenta.
 */
export interface AccountBalance {
  current: number;
  available: number;
}

/**
 * Interfaz para representar una Cuenta.
 */
export interface Account {
  id: string;
  link: string;
  institution: {
    name: string;
    type: string;
  };
  category: string;
  type: string;
  name: string;
  number: string;
  currency: string;
  balance: AccountBalance;
}

/**
 * Interfaz para representar un Balance.
 */
export interface Balance {
  id: string;
  link: string;
  account_id: string;
  currency: string;
  available: number;
  blocked: number;
  automatically_invested: number;
}

/**
 * Interfaz para representar una Transacción.
 */
export interface Transaction {
  id: string;
  account: {
    id: string;
    link: string;
    institution: {
      name: string;
      type: string;
    };
    name: string;
    number: string;
    currency: string;
    balance: AccountBalance;
  };
  amount: number;
  currency: string;
  description: string;
  value_date: string;
  type: string;
  status: string;
  category: string;
  subcategory: string;
}
