export const authStateMock = {
    // authenticating | not-authenticated | authenticated
  status: 'authenticating',
  user:null,
  idToken:null,
  refreshToken:null,
}

// porque no expongo mutations ??
export const mockedAuthStore = {
  namespaced: true,
  state: () => (authStateMock),

}