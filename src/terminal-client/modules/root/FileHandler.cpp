#include <iostream>
#include <fstream>
#include <string>


class FileHandler {
    private:
    std::string PathFile;
    std::fstream myFile;

    public:
    FileHandler(std::string file): PathFile(file) { };

    int writeFile(std::string& data) {
        myFile.open(PathFile, std::ios::out);
        if (!myFile.is_open()) return 1;
        myFile << data << "\n";
        myFile.close();
        return 0;
    }

    int appendFile(std::string data) {
        myFile.open(PathFile, std::ios::app);
        if (!myFile.is_open()) return 1;
        myFile << "\n" << data << "\n";
        myFile.close();
        return 0;
    }

    int readFile() {
        myFile.open(PathFile, std::ios::in);
        std::string line;
        while(std::getline(myFile, line)) std::cout << line << "\n";
        myFile.close();
        return 0;
    }

};


// int main() {
//     FileHandler fh = FileHandler("hola.txt");
//     fh.readFile();

//     std::cout << "\n-------------------------------\n";

//     fh.appendFile("This is another text append to this file using C++!");
//     fh.readFile();
    

//     return 0;
// }

