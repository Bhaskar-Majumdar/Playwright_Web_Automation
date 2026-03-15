import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { UserModel } from '../models/usermodel.ts';

// ESM way to get __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateRandomNumber(min: number, max: number): number {
    const randomNumber = Math.random() * (max - min) + min;
    return Math.floor(randomNumber);
}

export function saveJsonData(jsonObject: object, fileUrl: string): void {
    let dataArray: object[] = [];
    if (fs.existsSync(fileUrl)) {
        const fileContent = fs.readFileSync(fileUrl, 'utf-8');
        dataArray = JSON.parse(fileContent);
    }
    dataArray.push(jsonObject);
    fs.writeFileSync(fileUrl, JSON.stringify(dataArray, null, 2));
}

export function getLastUser(fileUrl: string): UserModel {
    const fileContent = fs.readFileSync(fileUrl, 'utf-8');
    const dataArray: UserModel[] = JSON.parse(fileContent);
    return dataArray[dataArray.length - 1];
}

export function saveToTextFile(filename: string, data: string) {
    const filePath = path.join(__dirname, "..", "resources", filename);
    fs.writeFileSync(filePath, data, 'utf-8');
}

export function updatePassword(email: string, newPassword: string): boolean {
    const fileUrl = path.join(__dirname, "..", "resources", "users.json");
    const fileData = fs.readFileSync(fileUrl, 'utf-8');
    const user: UserModel[] = JSON.parse(fileData);

    const userIndex = user.findIndex((u: any) => u.email === email);
    if (userIndex === -1) {
        console.log("User not found.");
        return false;
    }

    user[userIndex].password = newPassword;
    fs.writeFileSync(fileUrl, JSON.stringify(user, null, 2), 'utf-8');
    return true;
}