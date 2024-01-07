export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface AppUser extends User {
  isNew: boolean;
}

export default AppUser;
