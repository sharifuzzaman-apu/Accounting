'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa'

export default function UserProfile({
  user = {},
  onLogout,
  onUpdateProfile,
  size = 'md',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(user)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target. name]: e.target.value,
    })
  }

  const handleSave = () => {
    onUpdateProfile? .(formData)
    setIsEditing(false)
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="secondary"
        size={size}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <FaUser />
        <span className="hidden md:inline">{user.name?. split(' ')[0] || 'User'}</span>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          setIsEditing(false)
        }}
        title="User Profile"
        size="md"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
              <FaUser className="text-3xl text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <Badge variant="success" size="sm" className="mt-1">
                {user.status || 'Active'}
              </Badge>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <Input
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                name="role"
                label="Role"
                value={formData.role}
                onChange={handleChange}
              />
              
              <div className="flex gap-2">
                <Button variant="primary" onClick={handleSave} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{user. email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{user.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Role</p>
                  <p className="text-sm font-medium text-gray-900">{user.role}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(true)}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <FaCog /> Edit Profile
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    onLogout?.()
                    setIsOpen(false)
                  }}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}