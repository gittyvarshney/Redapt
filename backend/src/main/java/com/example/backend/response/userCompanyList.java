package com.example.backend.response;

import java.util.List;

public class userCompanyList {
    private List<userCompany> usrlist;
    private boolean error;

    public userCompanyList() {
    }

    public List<userCompany> getUsrlist() {
        return usrlist;
    }

    public void setUsrlist(List<userCompany> usrlist) {
        this.usrlist = usrlist;
    }

    public boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }
}
