export interface SignupRequest {
    fname: string;
    lname: string;
    username: string;
    password: string;
    dob: Date;
}

export interface User{
    id: string;
    username: string;
    fname: string;
    lname: string;
}