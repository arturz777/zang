import React, { useState, useEffect } from "react";
import { fetchProfile, updateProfile, changePassword } from "../http/userAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./ProfileSettings.module.css";

const ProfileSettings = ({ onBack }) => {
  const navigate = useNavigate();
  const [editField, setEditField] = useState(null);
  const [errors, setErrors] = useState({}); // ✅ Добавили useState для ошибок
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [cookiePreferences, setCookiePreferences] = useState({
    analytics: false,
    marketing: false,
    functional: false,
    personalization: false,
  });

  useEffect(() => {
    fetchProfile().then((data) => {
      setProfile({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        phone: data.phone || "",
      });
    });
  }, []);

  const handleEdit = (field) => {
    setEditField(field);
    setErrors({});
  };

  const handleSave = async () => {
    if (editField === "password") {
      await handlePasswordChange();
    } else {
      if (!profile[editField]) {
        setErrors((prev) => ({ ...prev, [editField]: "Заполните поле" }));
        return;
      }

      try {
        await updateProfile(profile);
        setEditField(null);
        toast.success("Данные успешно обновлены!");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Ошибка обновления данных"
        );
      }
    }
  };

  const handlePasswordChange = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrors({
        currentPassword: !currentPassword ? "Заполните поле" : "",
        newPassword: !newPassword ? "Заполните поле" : "",
        confirmPassword: !confirmPassword ? "Заполните поле" : "",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Новый пароль и подтверждение не совпадают");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setEditField(null);
      toast.success("Пароль успешно обновлен!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Ошибка смены пароля");
    }

    useEffect(() => {
      const savedPreferences = JSON.parse(
        localStorage.getItem("cookiePreferences")
      );
      if (savedPreferences) {
        setCookiePreferences(savedPreferences);
      }
    }, []);
  };

  const handleCookieChange = (type) => {
    setCookiePreferences((prev) => {
      const updatedPreferences = { ...prev, [type]: !prev[type] };
      localStorage.setItem(
        "cookiePreferences",
        JSON.stringify(updatedPreferences)
      );
      return updatedPreferences;
    });
  };

  useEffect(() => {
    const savedPreferences = JSON.parse(
      localStorage.getItem("cookiePreferences")
    );
    if (savedPreferences) {
      setCookiePreferences(savedPreferences);
    }
  }, []);

  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.mainContent}>
        <div className={styles.profileButtonBack}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            ← Назад
          </button>
        </div>

        <div className={styles.profileContainer}>
          <h1 className={styles.settingsHeader}>Настройки профиля</h1>

          {["firstName", "lastName", "phone"].map((field) => (
            <div key={field} className={styles.profileItem}>
              <span>
                {field === "firstName"
                  ? "Имя"
                  : field === "lastName"
                  ? "Фамилия"
                  : "Телефон"}
                :
              </span>
              {editField === field ? (
                <>
                  <input
                    type="text"
                    value={profile[field]}
                    onChange={(e) =>
                      setProfile({ ...profile, [field]: e.target.value })
                    }
                  />
                  {errors[field] && (
                    <span className={styles.errorText}>{errors[field]}</span>
                  )}
                </>
              ) : (
                <span>{profile[field]}</span>
              )}
              <button
                className={styles.editButton}
                onClick={() =>
                  editField === field ? handleSave() : handleEdit(field)
                }
              >
                {editField === field ? "Сохранить" : "Редактировать"}
              </button>
            </div>
          ))}

          <div className={styles.profileItem}>
            <span>Пароль:</span>
            {editField === "password" ? (
              <div className={styles.passwordInputs}>
                {["currentPassword", "newPassword", "confirmPassword"].map(
                  (field, index) => (
                    <div key={index}>
                      <input
                        type="password"
                        placeholder={
                          field === "currentPassword"
                            ? "Текущий пароль"
                            : field === "newPassword"
                            ? "Новый пароль"
                            : "Подтвердите пароль"
                        }
                        value={passwordData[field]}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            [field]: e.target.value,
                          })
                        }
                      />
                      {errors[field] && (
                        <span className={styles.errorText}>
                          {errors[field]}
                        </span>
                      )}
                    </div>
                  )
                )}
              </div>
            ) : (
              <span>*******</span>
            )}
            <button
              className={styles.editButton}
              onClick={() =>
                editField === "password" ? handleSave() : handleEdit("password")
              }
            >
              {editField === "password" ? "Сохранить" : "Редактировать"}
            </button>
          </div>

          <div className={styles.cookieSettings}>
  <h3 className={styles.cookieHeaderTitle}>Настройки cookies</h3>

  <label className={styles.cookieOption}>
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        checked={cookiePreferences.analytics}
        onChange={() => handleCookieChange("analytics")}
      />
    </div>
    <span>Разрешить аналитические cookies</span>
  </label>

  <label className={styles.cookieOption}>
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        checked={cookiePreferences.marketing}
        onChange={() => handleCookieChange("marketing")}
      />
    </div>
    <span>Разрешить маркетинговые cookies</span>
  </label>

  <label className={styles.cookieOption}>
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        checked={cookiePreferences.functional}
        onChange={() => handleCookieChange("functional")}
      />
    </div>
    <span>Разрешить функциональные cookies</span>
  </label>

  <label className={styles.cookieOption}>
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        checked={cookiePreferences.personalization}
        onChange={() => handleCookieChange("personalization")}
      />
    </div>
    <span>Разрешить cookies для персонализации</span>
  </label>
</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
