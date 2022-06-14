package com.example.backend.response;

public class reqProfileImages {
    private String profileImage;
    private String backgroundImage;
    private boolean Error;

    public reqProfileImages(){

    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getBackgroundImage() {
        return backgroundImage;
    }

    public void setBackgroundImage(String backgroundImage) {
        this.backgroundImage = backgroundImage;
    }

    public boolean getError() {
        return Error;
    }

    public void setError(boolean error) {
        Error = error;
    }
}
