export interface User {
    id?: number;
    name: string;
    email: string;
    company: {
        name: string;
    };
}

export interface UserFormData {
    name: string;
    email: string;
    companyName: string;
}

export const mapFormDataToUser = (formData: UserFormData): User => ({
    name: formData.name,
    email: formData.email,
    company: {
        name: formData.companyName
    }
});