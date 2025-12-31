import { goTo } from "../router/router";

const API_BASE_URL = "http://localhost:3000";

type StateData = {
  token: string | null;
  email: string | null;
  name: string | null;
  location: string | null;
};

const state: StateData = {
  token: null,
  email: null,
  name: null,
  location: null,
};

const listeners: Array<() => void> = [];

export const appState = {
  async init() {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    state.token = token;

    const res = await fetch(`${API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      this.logout();
      return;
    }

    const data = await res.json();

    state.email = data.email;
    state.name = data.name;
    state.location = data.location;

    listeners.forEach((cb) => cb());
  },
  getState() {
    return { ...state };
  },
  setState(newState: Partial<StateData>) {
    Object.assign(state, newState);
    listeners.forEach((cb) => cb());
  },
  subscribe(callback: () => void) {
    listeners.push(callback);
  },
  isAuthenticated() {
    return Boolean(state.token);
  },
  logout() {
    this.setState({ token: null, email: null });
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    goTo("/authEmail");
  },
  async checkEmail(email: string) {
    state.email = email;

    const res = await fetch(`${API_BASE_URL}/auth/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log("CHECK EMAIL RESPONSE:", data);

    if (data.exists) {
      goTo("/login");
    } else {
      goTo("/register");
    }
  },
  async login(password: string) {
    if (!state.email) {
      goTo("/authEmail");
      return;
    }

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: state.email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      // 👈 ACA ESTABA EL ERROR
      throw new Error(data.error || "Error al iniciar sesión");
    }

    state.token = data.token;
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", state.email);

    goTo("/");
  },
  async register(data: {
    name: string;
    email: string;
    location?: string;
    password: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
      }),
    });

    const resul = await res.json();

    localStorage.setItem("token", resul.token);
    localStorage.setItem("email", data.email);

    goTo("/");
  },
  async updateMe(name?: string, location?: string) {
    if (!state.token) {
      this.logout();
      return;
    }

    const res = await fetch(`${API_BASE_URL}/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify({ newName: name, newLocation: location }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al actualizar datos");
    }

    this.setState({
      name: data.name,
      location: data.location,
    });
  },
  async changePass(password: string) {
    if (!state.token) {
      this.logout();
      return;
    }

    const res = await fetch(`${API_BASE_URL}/auth/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify({
        newPassword: password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al actualizar contraseña");
    }
  },
  async createPet(name: string, lat: string, lng: string, file: File) {
    if (!state.token) {
      this.logout();
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("lat", String(lat));
    formData.append("lng", String(lng));
    formData.append("image", file);

    const res = await fetch(`${API_BASE_URL}/pets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al crear mascota perdida");
    }
  },
};
