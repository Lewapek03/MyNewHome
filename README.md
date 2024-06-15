# Dokumentacja
Autorzy: Paweł Bartkowicz (128218), Alan Borzozowski (128283)

Projekt na przedmiot "Języki programowania JavaScript - I - M.Zażlak - 2023/2024"
## Opis

To repozytorium zawiera kompletny kod backendu i frontendu dla portalu z ogłoszeniami nieruchomości. Portal umożliwia użytkownikom rejestrację i logowanie, dodawanie nowych ogłoszeń, edytowanie lub usuwanie własnych ogłoszeń oraz przeglądanie ogłoszeń innych użytkowników. Użytkownicy mogą filtrować ogłoszenia według tytułu lub lokalizacji. Dodatkowo, portal zawiera kalkulator kredytów hipotecznych, który jest osobną stroną, ale również jest wbudwowany w ogłoszenia.

## Funkcje

- **Autoryzacja użytkowników**: Rejestracja i logowanie użytkowników.
- **Dodawanie ogłoszeń**: Publikowanie nowych ogłoszeń nieruchomości.
- **Edycja i usuwanie ogłoszeń**: Edytowanie i usuwanie własnych ogłoszeń.
- **Przeglądanie ogłoszeń**: Przeglądanie ogłoszeń innych użytkowników.
- **Filtrowanie ogłoszeń**: Filtrowanie ogłoszeń według tytułu lub lokalizacji.
- **Kalkulator kredytowy**: Wbudowany kalkulator kredytów hipotecznych.

## Technologie

### Frontend

Frontend aplikacji został zbudowany przy użyciu następujących technologii:
- **React**: Biblioteka do budowy interfejsu użytkownika.
- **Bootstrap**: Framework CSS do responsywnego i mobilnego pierwszego projektu.
- **Axios**: Biblioteka do wykonywania zapytań HTTP.
- **React-Router-Dom**: Narzędzie do nawigacji po aplikacji React.

### Backend

Backend aplikacji został zbudowany przy użyciu następujących technologii:
- **Node.js**: Środowisko uruchomieniowe JavaScript.
- **Express**: Framework do budowy aplikacji webowych w Node.js.
- **MySQL**: Relacyjna baza danych.
- **API**: Interfejs programowania aplikacji, umożliwiający komunikację między frontendem a backendem.
- **Token JWT**: JSON Web Token, używany do bezpiecznej wymiany informacji.


## Instrukcja uruchomienia

Aby uruchomić stronę, wykonaj poniższe kroki:

1. Sklonuj repozytorium:
   ```bash
   git clone <URL-repozytorium>
   ```

2. Przejdź do głównego folderu projektu:
   ```bash
   cd <folder-projektu>
   ```

3. Uruchom Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Przejdź do folderu frontendu:
   ```bash
   cd frontend
   ```

5. Zainstaluj zależności frontendu:
   ```bash
   npm install
   ```

6. Uruchom frontend:
   ```bash
   npm start
   ```


## Uwierzytelnianie

Aplikacja wykorzystuje token JWT do uwierzytelniania użytkowników. Token jest generowany podczas logowania i dołączany do każdego żądania wymagającego autoryzacji.

## Przykłady zapytań API

### Rejestracja użytkownika

- **URL**: `/api/signup`
- **Metoda**: POST
- **Body**:
  ```json
  {
    "username": "exampleUser",
    "email": "user@example.com",
    "password": "examplePassword"
  }
  ```

### Logowanie użytkownika

- **URL**: `/api/signin`
- **Metoda**: POST

- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "examplePassword"
  }
  ```

