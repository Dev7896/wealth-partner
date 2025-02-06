export interface BasicInfo {
  email: string
  phone?: string
  dateOfBirth?: string
  income?: number
  businessName?: string
}

export interface AccountInfo {
  username: string
  loginInfo?: string
  deviceInfo?: string
  securityAnswer?: string
}

export interface Preferences {
  emailNotifications: boolean
  siteNotifications: boolean
}

export interface SupportQuery {
  subject: string
  message: string
}

