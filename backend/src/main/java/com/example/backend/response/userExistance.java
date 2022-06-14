package com.example.backend.response;

public class userExistance {
    private boolean isExist;
    private boolean Error;

    public userExistance(){

    }

    public boolean isError() {
        return Error;
    }

    public void setError(boolean error) {
        Error = error;
    }

    public boolean isExist() {
        return isExist;
    }

    public void setExist(boolean exist) {
        isExist = exist;
    }
}
