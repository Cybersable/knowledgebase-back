import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { CategoriesModule } from './categories/categories.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    WorkspacesModule,
    CategoriesModule,
    ArticlesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
