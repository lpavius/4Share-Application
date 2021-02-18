package com.paviuslucy.ForShare.responseFile;

public class FileUrl {

    String url;

    public FileUrl(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "fileUrl{" +
                "url='" + url + '\'' +
                '}';
    }
}
