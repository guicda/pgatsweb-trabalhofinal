// Dados aleatórios usando faker (ESM)
import { faker } from '@faker-js/faker';

// Gera um usuário com apenas os campos necessários para os testes
export function createRandomUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;

  // Data de nascimento (componentes para os selects)
  const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dob = {
    day: String(birthDate.getDate()),
    month: monthNames[birthDate.getMonth()],
    year: String(birthDate.getFullYear())
  };

  // Endereço e contato
  const company = faker.company.name();
  const address1 = faker.location.streetAddress();
  const address2 = faker.location.secondaryAddress();
  const country = 'Canada'; // Mantemos fixo para garantir que exista no combo
  const state = faker.location.state();
  const city = faker.location.city();
  const zipcode = faker.location.zipCode();
  const mobile = faker.phone.number('+1 ### ###-####');

  // E-mail com provedor estável para facilitar debug
  const email = faker.internet.email({ firstName, lastName, provider: 'uorak.com' }).toLowerCase();

  return {
    // Identificação
    firstName,
    lastName,
    fullName,
    email,
    password: faker.internet.password({ length: 10 }),
    // Data de nascimento para selects
    dob,
    // Endereço
    company,
    address1,
    address2,
    country,
    state,
    city,
    zipcode,
    mobile
  };
}